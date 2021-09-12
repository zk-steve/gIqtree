const { app, BrowserWindow, ipcMain, dialog, screen } = require("electron");
const fs = require("fs");
const path = require("path");
const isDev = require("electron-is-dev");
const child_process = require("child_process");
const {kill} = require("process")
const os = require("os");
const homepage = require("./server/controller/homepage");
const project = require("./server/controller/project")
const { iqtreePath } = require("./server/db");
const { v4: uuidv4 } = require("uuid");
const { getOutputWhenExecuted } = require("./server/controller/execute");
const { viewFile } = require("./server/controller/file_handler");


const { mappingCommand, baseCommand } = require("./server/command_line/mapping_command");

const FIND_MODEL = require("./server/command_line/default/find_model");
const MERGE_PARTITION = require("./server/command_line/default/merger_partition");
const INFER_TREE = require("./server/command_line/default/infer_tree");
const ASSESS_SUPPORT = require("./server/command_line/default/assess_support");
const DATE_TREE = require("./server/command_line/default/date_tree");
const { getProgress } = require("./server/controller/progress");
const { chooseFile } = require("./server/controller/dialog");

let OBJECT_SETTING;
let COMMAND = "";

let mainWindow;
let inputFileName;
function createWindow() {
  const display = screen.getPrimaryDisplay();
  const dimensions = display.workAreaSize;
  mainWindow = new BrowserWindow({
    minWidth: 1440,
    minHeight: 600,
    width: dimensions.width,
    height: dimensions.height,
    maxWidth: dimensions.width,
    maxHeight: dimensions.height,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    icon: `${__dirname}/assets/icon.ico`,
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on("viewFile", (event, filePath) => {
    viewFile(filePath)
      .then((data) => {
        console.log({ readFile: data });
        mainWindow.webContents.send("viewFileData", {message: data, status: 1});
      })
      .catch((err) =>
        mainWindow.webContents.send("viewFileData", {
          message: "Does not read file",
          status: 0
        })
      );
  });
  
  ipcMain.handle("progressProject", async(event, project_id) => {
    await getProgress(project_id).then(data => {
      event.sender.send("progressResult", data)
    }).catch(err => {
      event.sender.send("progressResult", err)
    })
  })

  ipcMain.on("chooseFile", (event) => {
    chooseFile().then(data => {
      mainWindow.webContents.send("chooseFileResult", data)
    }).catch(err => {
      mainWindow.webContents.send("chooseFileResult", err);
    })
  })

  ipcMain.on("reopenProject", (event, project_id) => {
    project.reopenProject(project_id)
      .then(data => {
        mainWindow.webContents.send("reopenProjectResult", {
          message: data,
          status: 1,
        });
      })
      .catch(err => {
        mainWindow.webContents.send("reopenProjectResult", err);
      })
  })

  ipcMain.on("openProject", (event) => {
    project.openProject()
      .then(data => {
        mainWindow.webContents.send("openProjectResult", {
          message: data,
          status: 1,
        });
      })
      .catch(err => {
        mainWindow.webContents.send("openProjectResult", err);
      })
  })

  ipcMain.handle("testSetting", async (event, project_id, object_model) => {
    OBJECT_SETTING = object_model
    let project_path;
    await homepage
      .getProjectById(project_id)
      .then((data) => {
        project_path = data[0].path;
      })
      .catch((err) => {
        event.sender.send("progressResult", {message: "ERROR", status: 0})
      });
    console.log({ project_path });
    let input_path = path.join(project_path, "input");
    let output_path = path.join(project_path, "output", "output");
    let command = baseCommand() + mappingCommand(OBJECT_SETTING, input_path, output_path)
    console.log({command})
    event.sender.send("progressResult", {message: command, status: 1})
  })

  ipcMain.handle("saveSetting", (event, object_model) => {
    OBJECT_SETTING = object_model;
    mainWindow.webContents.send("saveSettingResult", {message: OBJECT_SETTING, status: 1, command: COMMAND})
  });

  ipcMain.on("restart", (event, project_id) => {
    let type = "restart";
    let object_model = OBJECT_SETTING;
    project.executeProject(project_id, object_model, type)
      .then(data => {
        COMMAND = data.command
        console.log({BBB: COMMAND})
        event.sender.send("executeResult", data)
      })
        .catch(err => event.sender.send("executeResult", err))
  })

  ipcMain.on("pauseProject", (event, process_id) => {
    kill(process_id, 'SIGINT')
    mainWindow.webContents.send({message: "Pause", status: 1})
  })

  ipcMain.handle("executeProject", async (event, project_id) => {
    let type = "first"
    let object_model = OBJECT_SETTING;
    project.executeProject(project_id, object_model, type)
      .then(data => {
        COMMAND = data.command
        console.log({BBB: data})
        event.sender.send("executeResult", data)
      })
        .catch(err => event.sender.send("executeResult", err))
  });

  ipcMain.on("selectDialog", async (event, project_id) => {
    try {
      // Step 1: Choose msa file and get path and name of it
      const filePath = dialog.showOpenDialogSync({
        properties: ["openFile", "multiSelections"],
        filters: [{ name: "msa file", extensions: ["msa", "phy"] }],
      });
      if (!filePath) {
        mainWindow.webContents.send("cancelSelect", { message: "File path is not true", status: 0 });
      } else {
        const fileName = filePath.map((element) => {
          console.log(element);
          let result;
          if (os.type() === "Windows_NT") {
            result = element.split("\\");
          } else {
            result = element.split("/");
          }
          return result[result.length - 1];
        });
        inputFileName = fileName[0];
        // Step 2: Copy input file into folder input of project
        let projectPath;
        await homepage.getProjectById(project_id).then((data) => {
          projectPath = path.join(data[0].path, "input");
        });

        for (let i = 0; i < filePath.length; i++) {
          let elementPath = path.join(projectPath, fileName[i]);
          fs.copyFile(filePath[i], elementPath, (err) => {
            if (err) throw err;
            else console.log("Copy successfully");
          });
        }

        setTimeout(() => {
          try {
            fs.readdir(projectPath, "utf-8", (err, files) => {
              if (err) throw err;
              let fileName = files.map((file) => {
                return {
                  name: file,
                  path: path.join(projectPath, file),
                };
              });
              console.log({ AAA: fileName });
              mainWindow.webContents.send("selectFile", {
                message: fileName,
                status: 1,
              });
            });
          } catch (err) {
            mainWindow.webContents.send("selectFile", {
              message: "File is exists",
              status: 0,
            });
          }
        }, 100);
      }
    } catch (err) {
      console.log({ message: "Some thing was wrong", status: 0 });
    }
  });

  ipcMain.on("getInputByProject", (event, project_id) => {
    project.getInputByProject(project_id)
      .then(fileName => {
          mainWindow.webContents.send("inputsOfProject", {
            message: fileName,
            status: 1,
          });
      })
      .catch(err => {
        mainWindow.webContents.send("inputsOfProject", err);
      })
  });

  ipcMain.on("deleteInput", async (event, inputData) => {
    const { input_name, project_id } = inputData;
    console.log(inputData);
    try {
      await homepage.getProjectById(project_id).then((data) => {
        let inputFile = path.join(data[0].path, "input", input_name);
        fs.unlinkSync(inputFile);
        mainWindow.webContents.send("deleteResult", {
          message: "Deleted",
          status: 1,
          name: input_name,
        });
      });
    } catch (err) {
      console.log("fail");
      mainWindow.webContents.send("deleteResult", {
        message: "Does not delete it",
        status: 0,
      });
    }
  });

  ipcMain.on("getHistory", (event) => {
    homepage.getHistory().then((data) => {
      mainWindow.webContents.send("returnHistory", {message:data, status:1});
    });
  });
  ipcMain.on("openDir", async (event, name) => {
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: `./${name}`,
    });
    mainWindow.webContents.send("openDirSuccess", { message:filePath, status:1 });
  });

  ipcMain.on("setProject", (event, data) => {
    project.setProject(data)
      .then(result => {
        mainWindow.webContents.send("setProjectSuccess", result);
      }).catch(err => {
        mainWindow.webContents.send("setProjectSuccess", err);
      })
  });

  ipcMain.on("getProjectById", (event, id) => {
    homepage.getProjectById(id).then((data) => {
      console.log(data[0].project_type)
      switch (data[0].project_type) {
        case "findModel":
          data[0].object_model = FIND_MODEL;
          OBJECT_SETTING = FIND_MODEL;
          break;
        case "mergePartition":
          console.log({ MERGE_PARTITION });
          data[0].object_model = MERGE_PARTITION;
          OBJECT_SETTING = MERGE_PARTITION;
          break;
        case "inferTree":
          data[0].object_model = INFER_TREE;
          OBJECT_SETTING = INFER_TREE;
          break;
        case "assessSupport":
          data[0].object_model = ASSESS_SUPPORT;
          OBJECT_SETTING = ASSESS_SUPPORT;
          break;
        case "dateTree":
          data[0].object_model = DATE_TREE;
          OBJECT_SETTING = DATE_TREE;
          break;
        default:
          break;
      }
      console.log({ data });
      mainWindow.webContents.send("returnProjectById", {message: data, status:1});
    }).catch(err => {
      mainWindow.webContents.send("returnProjectById", {message: "Can not get project", status: 0});
    });
  });

  ipcMain.on("search", (event, name) => {
    homepage.search(name).then((data) => {
      mainWindow.webContents.send("searchProject", {message: data,status: 1});
    }).catch(err => {
      mainWindow.webContents.send("searchProject", {message: "Can not search",status: 1});
    });
  });
  mainWindow.on("closed", () => (mainWindow = null));
  ipcMain.on("minimizeApp", () => {
    console.log("sent");
    mainWindow.minimize();
  });
  ipcMain.on("maximizeApp", () => {
    mainWindow.maximize();
  });
  ipcMain.on("closeApp", () => {
    mainWindow.close();
  });
  ipcMain.on("unmaximizeApp", () => {
    mainWindow.unmaximize();
  });
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("maximize");
  });
  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("unmaximize");
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") {
  app.quit();
  app.exit();
  // }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
