const fs = require("fs");
const path = require("path");
const { dialog } = require("electron");
const os = require("os");
const { v4: uuidv4 } = require("uuid");
const child_process = require("child_process");

const { iqtreePath } = require("../db")
const { getOutputWhenExecuted } = require("../controller/execute")
const { mappingCommand, baseCommand } = require("../command_line/mapping_command");

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

const storeSetting = (project_path, object_model) => {
  
}

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
    fs.mkdir(input, { recursive: true }, (err) => {
      if (err) {
        reject({ message: "Does not create input folder", status: 0 });
      } else console.log("Created input folder");
    });
    await fs.mkdir(output, { recursive: true }, (err) => {
      if (err) {
        reject("setProjectSuccess", {
          message: "Does not create output folder",
          status: 0,
        });
      } else console.log("Created ouput folder");
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

const executeProject = async (project_id, object_model, type) => {
  return new Promise(async(resolve, reject) => {
    let project_path;
    await homepage
      .getProjectById(project_id)
      .then((data) => {
        project_path = data[0].path;
      })
      .catch((err) => {
        reject({message:"does not get project path" ,status:0});
      });
    console.log({ project_path });
    let input_path = path.join(project_path, "input");
    let output_path = path.join(project_path, "output", "output");
    await mappingCommand(object_model, input_path, output_path).then((data) => {
      console.log("exec...");
      let pre = baseCommand()
      let COMMAND = pre + data
      if (type === "restart") {
        COMMAND += " --redo"
      }
      let process_id = child_process.exec(COMMAND, async (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          reject({message: "Does not execute", status: 0});
          return;
        }
        console.log("done");
        await getOutputWhenExecuted(project_path)
          .then((result) => {
            console.log({result, COMMAND})
            resolve({message: result, status: 1, command: COMMAND, processId: process_id.pid});
          })
          .catch((err) => {
            console.log({ errorExecuted: "does not get output" });
            reject({message: "Does not get output", status: 0});
          });
      });
    }).catch(err => {
      reject({message: "Input is folder and contains files", status: 0});
    });
  })
}

// reopenProject('2db22c01-d7a0-4101-9579-23aafb0698ad').then(data => {
//     console.log(data)
// }).catch(err => console.log(err))

// openProject().then(data => console.log(data)).catch(err => console.log(err))

// getInputByProject('2db22c01-d7a0-4101-9579-23aafb0698ad').then(data => {
//     console.log(data)
// }).catch(err => console.log(err))

// getOutputByProject('2db22c01-d7a0-4101-9579-23aafb0698ad').then(data => {
//     console.log(data)
// }).catch(err => console.log(err))

module.exports = {
  getInputByProject,
  getOutputByProject,
  reopenProject,
  setProject,
  openProject,
  executeProject
};
