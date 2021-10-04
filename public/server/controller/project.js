const fs = require("fs");
const fs_extra = require("fs-extra");
const path = require("path");
const { dialog } = require("electron");
const os = require("os");
const { v4: uuidv4 } = require("uuid");
const child_process = require("child_process");

const { getOutputWhenExecuted } = require("../controller/execute");
const {
  mappingCommand,
  baseCommand,
} = require("../command_line/mapping_command");
const FIND_MODEL = require("../command_line/default/find_model");
const MERGE_PARTITION = require("../command_line/default/merger_partition");
const INFER_TREE = require("../command_line/default/infer_tree");
const ASSESS_SUPPORT = require("../command_line/default/assess_support");
const DATE_TREE = require("../command_line/default/date_tree");

const homepage = require("./homepage");

const getInputByProject = (project_id) => {
  return new Promise((resolve, reject) => {
    try {
      homepage.getProjectById(project_id).then((data) => {
        const inputFolder = path.join(data[0].path, "input");
        console.log({ inputFolder });
        fs.readdir(inputFolder, "utf-8", (err, files) => {
          if (err) {
            reject({
              message: "Error",
              status: 0,
            });
          }
          let fileName = files.map((file) => {
            return {
              name: file,
              path: path.join(inputFolder, file),
            };
          });
          resolve(fileName);
        });
      });
    } catch (err) {
      reject({
        message: "Error",
        status: 0,
      });
    }
  });
};

const getOutputByProject = (project_id) => {
  return new Promise((resolve, reject) => {
    try {
      homepage.getProjectById(project_id).then((data) => {
        const outputFolder = path.join(data[0].path, "output");
        console.log({ outputFolder });
        fs.readdir(outputFolder, "utf-8", (err, files) => {
          if (err) {
            reject({
              message: "Error",
              status: 0,
            });
          }
          let fileName = files.map((file) => {
            return {
              name: file,
              path: path.join(outputFolder, file),
            };
          });
          resolve(fileName);
        });
      });
    } catch (err) {
      reject({
        message: "Error",
        status: 0,
      });
    }
  });
};

const reopenProject = (project_id) => {
  return new Promise((resolve, reject) => {
    homepage
      .getProjectById(project_id)
      .then((data) => {
        if (fs.existsSync(data[0].path)) {
          try {
            let projectPath = data[0].path;
            fs.readdir(projectPath, "utf-8", (err, files) => {
              if (err) {
                reject({
                  message: "Error",
                  status: 0,
                });
              }
              let fileName = files.filter((file) => {
                return file === "input" || file === "output";
              });
              if (fileName.length >= 2) {
                getInputByProject(project_id)
                  .then((inputFiles) => {
                    getOutputByProject(project_id)
                      .then((outputFiles) => {
                        console.log({ inputFiles, outputFiles });
                        resolve({ inputFiles, outputFiles, project_id });
                      })
                      .catch((err) => reject(err));
                  })
                  .catch((err) => reject(err));
              }
            });
          } catch (err) {
            reject({ message: "does not get project path", status: 0 });
          }
        }
      })
      .catch((err) => {
        reject({ message: "does not get project path", status: 0 });
      });
  });
};

const createFolders = async (paths) => {
  return new Promise(async (resolve, reject) => {
    if (Array.isArray(paths)) {
      paths.forEach(async (path) => {
        await fs.mkdir(path, { recursive: true }, (err) => {
          if (err) {
            reject({ message: "Does not create input folder", status: 0 });
          }
        });
      });
      resolve(`Created`);
    }
  });
};

const initObjectModel = (projectPath, projectType = "findModel") => {
  return new Promise(async (resolve, reject) => {
    let object_model;
    switch (projectType) {
      case "findModel":
        object_model = FIND_MODEL;
        break;
      case "mergePartition":
        object_model = MERGE_PARTITION;
        break;
      case "inferTree":
        object_model = INFER_TREE;
        break;
      case "assessSupport":
        object_model = ASSESS_SUPPORT;
        break;
      case "dateTree":
        object_model = DATE_TREE;
        break;
      default:
        object_model = FIND_MODEL;
        break;
    }
    resolve(object_model);
  });
};

const filterName = (path) => {
  return new Promise((resolve, reject) => {
    if (!path) reject({ message: "Can not get path", staus: 0 });
    let result;
    if (os.type() === "Windows_NT") {
      result = path.split("\\");
    } else {
      result = path.split("/");
    }
    console.log({ result });
    resolve(result[result.length - 1]);
  });
};

const copyFile = (sourcePath, destPath) => {
  return new Promise(async (resolve, reject) => {
    await fs.copyFileSync(sourcePath, destPath);
    console.log("Copy File");
    resolve("Copy file");
  });
};

const copyFolder = (sourcePath, destPath) => {
  return new Promise(async (resolve, reject) => {
    await fs_extra
      .copy(sourcePath, destPath)
      .then(() => {
        console.log("Copied folder")
        resolve("Copied");
      })
      .catch((err) => {
        reject({ message: "Does not copy", status: 0 });
      });
  });
};

const addSettingFile = (projectPath, object_model) => {
  return new Promise(async (resolve, reject) => {
    const settingPath = path.join(projectPath, "setting.json");
    await fs.writeFile(settingPath, JSON.stringify(object_model), (err) => {
      if (err) reject({ message: "Something was wrong", status: 0 });
      setTimeout(() => {
        resolve("done")
      }, 30)
    });
  });
};

const clearProjectInput = (projectPath) => {
  return new Promise(async (resolve, reject) => {
    fs.readdir(projectPath, (err, files) => {
        if (err) throw err;
        
        for (const file of files) {
            if (isFolder(path.join(projectPath, file))) {
                fs.rmdirSync(path.join(projectPath, file),  {
                    recursive: true,
                })
            }
            else {
                fs.unlink(path.join(projectPath, file), err => {
                  if (err) reject({ message: "Something was wrong", status: 0 })
                });
            }
      }
      resolve("Done")
    });
  });
}

const settingHelper = ( projectPath, objectModel) => {
  return new Promise((resolve, reject) => {
    try {
      let { alignment, partition } = objectModel.data;
      let { constrainedTreeFile, referenceTree } = objectModel.tree;
      let { gCF } = objectModel.assessment.concordanceFactor;
      let { dateFile } = objectModel.dating;

      clearProjectInput(path.join(projectPath, "input"))
        .then(async data => {
          console.log("Done")
          if (Array.isArray(alignment)) {
            alignment.forEach(sourcePath => {
              filterName(sourcePath)
                .then(async name => {
                  const destPath = path.join(projectPath, "input", name)
                  await copyFile(sourcePath, destPath)
                  objectModel.data.alignment = destPath
                })
            })
          }
          else if (isFolder(alignment)) {
            console.log("======================\n isFolder")
            filterName(alignment)
                .then(async name => {
                  const destPath = path.join(projectPath, "input", name)
                  await copyFolder(alignment, destPath)
                  objectModel.data.alignment = destPath
                })
          }
          const files = []
          if (partition.length >= 1) {
            files.push(partition)
            filterName(partition)
            .then(async name => {
              const destPath = path.join(projectPath, "input", name)
              await copyFile(partition, destPath)
              objectModel.data.partition = destPath
            })
          }
          if (constrainedTreeFile.length >= 1) {
            files.push(constrainedTreeFile)
            filterName(constrainedTreeFile)
            .then(async name => {
              const destPath = path.join(projectPath, "input", name)
              await copyFile(constrainedTreeFile, destPath)
              objectModel.tree.constrainedTreeFile = destPath
            })
          }
          if (referenceTree.length >= 1) {
            files.push(referenceTree)
            filterName(referenceTree)
            .then(async name => {
              const destPath = path.join(projectPath, "input", name)
              await copyFile(referenceTree, destPath)
              objectModel.tree.referenceTree = destPath
            })
          }
          if (gCF.length >= 1) {
            files.push(gCF)
            filterName(gCF)
            .then(async name => {
              const destPath = path.join(projectPath, "input", name)
              await copyFile(gCF, destPath)
              objectModel.assessment.concordanceFactor.gCF = destPath
            })
          }
          if (dateFile.length >= 1) {
            files.push(dateFile)
            filterName(dateFile)
            .then(async name => {
              const destPath = path.join(projectPath, "input", name)
              await copyFile(dateFile, destPath)
              objectModel.dating.dateFile = destPath
            })
          }
          setTimeout(() => {
            resolve(objectModel)
          }, 10)
        })
        .catch(err => {
          throw err
        })
    } catch (err) {
      reject({ message: "Something was wrong", status: 0 })
    }
  })
}

const saveSetting = (projectPath, objectModel) => {
  return new Promise((resolve, reject) => {
    settingHelper(projectPath, objectModel)
      .then(newObjectModel => {
        addSettingFile(projectPath, newObjectModel)
          .then(data => {
            setTimeout(() => {
              console.log({newObjectModel})
              resolve(newObjectModel)
            }, 100)
          })
          .catch(err => reject({ message: "Something was wrong", status: 0 }))
      })
      .catch(err => reject({ message: "Something was wrong", status: 0 }))
  })
}

const readSettingObject = (projectPath) => {
  return new Promise(async (resolve, reject) => {
    const settingPath = path.join(projectPath, "setting.json");
    if (fs.existsSync(projectPath)) {
      await fs.readFile(settingPath, (err, data) => {
        if (err) reject({ message: "Something was wrong", status: 0 });
        data = JSON.parse(data);
        resolve(data);
      });
    } else {
      reject({ message: "Can not find setting.json", status: 0 });
    }
  });
};

const isFolder = (folderPath) => {
  try {
    return fs.lstatSync(folderPath).isDirectory();
  } catch (err) {
    return false;
  }
};

const recursiveFiles = (folderPath, resultObject) => {
  let files = fs.readdirSync(folderPath)
  filterName(folderPath)
    .then(data => {
      resultObject.name = data
      resultObject.path = folderPath
      resultObject.children = []
      files.forEach(element => {
          const absolutePath = path.join(folderPath, element)
          if (isFolder(absolutePath)) {
              resultObject.children.push({path: absolutePath, name: element})
              recursiveFiles(absolutePath, resultObject.children[resultObject.children.length - 1])
          }
          else {
              resultObject.children.push({path: absolutePath, name: element})
          }
      })
    })
    .catch(err => console.log(err))
}

const getProject = (projectPath) => {
  return new Promise(async (resolve, reject) => {
    const resultObject = {};
    if (isFolder(projectPath)) {
      recursiveFiles(projectPath, resultObject);
    } else {
      reject({ message: "Is not a folder", status: 0 });
    }
    readSettingObject(projectPath)
      .then((object_model) => {
        filterName(projectPath)
          .then((name) => {
            resolve({
              projectDetail: resultObject,
              objectModel: object_model
            });
          })
          .catch((err) => {
            reject({ message: "Does not get project name", status: 0 });
          });
      })
      .catch((err) => {
        reject({ message: "Does not get object model", status: 0 });
      });
  });
};

const setProject = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, filePath, projectType } = data;
    if (!fs.existsSync(filePath)) {
      fs.mkdir(filePath, { recursive: true }, (err) => {
        if (err) {
          reject({ message: "Does not create project", status: 0 });
        } else {
          console.log("created");
        }
      });
    }
    const input = path.join(filePath, "input");
    const output = path.join(filePath, "output");
    // const alignments = path.join(filePath, "input", "alignments")
    await createFolders([input, output])
      .then((data) => console.log(data))
      .catch((err) => reject(err));
    await initObjectModel(filePath, projectType)
      .then((object_model) => {
        addSettingFile(filePath, object_model)
          .then((message) => console.log(message))
          .catch((err) =>
            reject({ message: "Does not create project", status: 0 })
          );
      })
      .catch((err) => {
        reject({ message: "Does not create project", status: 0 });
      });
    let project_id = uuidv4();
    console.log(project_id);
    homepage
      .setProject(name, filePath, project_id, projectType)
      .then((data) => {
        resolve({ message: data, status: 1 });
      })
      .catch((err) => {
        reject({ message: "Does not store project into database", status: 0 });
      });
  });
};

const openProject = () => {
  return new Promise((resolve, reject) => {
    try {
      const filePath = dialog.showOpenDialogSync({
        properties: ["openDirectory"],
      });
      console.log({ filePath });
      console.log("-------------------------");
      if (filePath) {
        console.log("==============================");
        homepage
          .getProjectByPath(filePath)
          .then((data) => {
            console.log({ data });
            if (data.length === 0) {
              console.log("ZZZZZZZZZZZZZZZZZZZZZ");
              console.log({ filePath });
              let splitPath;
              if (os.type() === "Windows_NT") {
                splitPath = filePath[0].split("\\");
              } else {
                splitPath = filePath[0].split("/");
              }
              let newProject = {
                name: splitPath[splitPath.length - 1],
                filePath: filePath[0],
                projectType: "findModel",
              };
              setProject(newProject)
                .then((data) => {
                  console.log({ resolve: data });
                  reopenProject(data.message.project_id)
                    .then((data) => {
                      console.log({ data });
                      resolve(data);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                })
                .catch((err) => {
                  console.log({ err });
                  reject(err);
                });
            } else {
              console.log("XXXXXXXXXXXXXXXXX");
              reopenProject(data[0].project_id)
                .then((data) => {
                  console.log({ resolve: data });
                  resolve(data);
                })
                .catch((err) => {
                  console.log({ err });
                  reject(err);
                });
            }
          })
          .catch((err) => {
            reject({ message: "Does not get project by path", status: 0 });
          });
      }
    } catch (err) {
      reject({ message: "Something was wrong", status: 0 });
    }
  });
};

const executeProject = async (project_path, object_model, type) => {
  return new Promise(async (resolve, reject) => {
    console.log({ project_path });
    let input_path = path.join(project_path, "input");
    let output_path = path.join(project_path, "output", "output");
    await mappingCommand(object_model, input_path, output_path)
      .then((data) => {
        console.log("exec...");
        let pre = baseCommand();
        let COMMAND = pre + data;
        // if (type === "restart") {
          COMMAND += " --redo";
        // }
        console.log({ BBB: COMMAND });
        let process_id = child_process.exec(
          COMMAND,
          async (err, stdout, stderr) => {
            if (err) {
              console.error(`exec error: ${err}`);
              reject({ message: "Does not execute", status: 0 });
              return;
            }
            console.log("done");
            await getOutputWhenExecuted(project_path)
              .then((result) => {
                console.log({ result, COMMAND });
                resolve({
                  message: result,
                  status: 1,
                  command: COMMAND,
                  processId: process_id.pid,
                });
              })
              .catch((err) => {
                console.log({ errorExecuted: "does not get output" });
                reject({ message: "Does not get output", status: 0 });
              });
          }
        );
      })
      .catch((err) => {
        reject({ message: "Input is folder and contains files", status: 0 });
      });
  });
};

module.exports = {
  getInputByProject,
  getOutputByProject,
  reopenProject,
  setProject,
  openProject,
  executeProject,
  initObjectModel,
  addSettingFile,
  readSettingObject,
  filterName,
  copyFile,
  copyFolder,
  getProject,
  saveSetting,
  isFolder
};
