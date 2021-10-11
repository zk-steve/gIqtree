const { app, BrowserWindow, ipcMain, dialog, screen } = require("electron");
const fs = require("fs");
const path = require("path");
const isDev = require("electron-is-dev");
const { kill } = require("process");
const homepage = require("./server/controller/homepage");
const project = require("./server/controller/project");
const { viewFile } = require("./server/controller/file_handler");

const { chooseFile, chooseFolder, chooseMultiFile } = require("./server/controller/dialog");
const { getProgress } = require("./server/controller/progress");

let COMMAND = "";

let mainWindow;
function createWindow() {
  const display = screen.getPrimaryDisplay();
  const dimensions = display.workAreaSize;
  mainWindow = new BrowserWindow({
    minWidth: 1440,
    minHeight: 600,
    width: dimensions.width,
    height: dimensions.height,
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
    if (project.isFolder(filePath)) {
      mainWindow.webContents.send("viewFileData", {
        message: "Is folder",
        status: 0
      });
    }
    else {
      console.log("This is a file")
      viewFile(filePath)
      .then((data) => {
        console.log({ readFile: data });
        mainWindow.webContents.send("viewFileData", {
          message: data,
          status: 1,
        });
      })
      .catch((err) =>
        mainWindow.webContents.send("viewFileData", {
          message: "Does not read file",
          status: 0,
        })
      );
    }
  });

  ipcMain.on("chooseFile", (event, project_path) => {
    chooseFile(project_path)
      .then((data) => {
        console.log({file: data})
        mainWindow.webContents.send("chooseFileResult", {
          message: data,
          status: 1,
        });
      })
      .catch((err) => {
        mainWindow.webContents.send("chooseFileResult", err);
      });
  });

  ipcMain.on("chooseMultiFile", (event, project_path) => {
    chooseMultiFile(project_path)
      .then((data) => {
        console.log({files: data})
        mainWindow.webContents.send("chooseMultiFileResult", {
          message: data,
          status: 1,
        });
      })
      .catch((err) => {
        mainWindow.webContents.send("chooseMultiFileResult", err);
      });
  });

  ipcMain.on("chooseFolder", (event, project_path) => {
    chooseFolder(project_path)
      .then((data) => {
        console.log({folder: data})
        mainWindow.webContents.send("chooseFolderResult", {
          message: data,
          status: 1,
        });
      })
      .catch((err) => {
        mainWindow.webContents.send("chooseFolderResult", err);
      });
  });

  ipcMain.on("reopenProject", (event, project_id) => {
    project
      .reopenProject(project_id)
      .then((data) => {
        mainWindow.webContents.send("reopenProjectResult", {
          message: data,
          status: 1,
        });
      })
      .catch((err) => {
        mainWindow.webContents.send("reopenProjectResult", err);
      });
  });

  ipcMain.on("openProject", (event) => {
    project
      .openProject()
      .then((data) => {
        mainWindow.webContents.send("openProjectResult", {
          message: data,
          status: 1,
        });
      })
      .catch((err) => {
        mainWindow.webContents.send("openProjectResult", err);
      });
  });

  ipcMain.handle("saveSetting", (event, project_path, object_model) => {
    project.saveSetting(project_path, object_model)
      .then(data => {
        mainWindow.webContents.send("saveSettingResult", {
          message: object_model,
          status: 1
        });
      })
      .catch(err => {
        mainWindow.webContents.send("saveSettingResult", {message: err, status: 0});
      })
  });

  ipcMain.handle("restartProject", async (event, project_path) => {
    let type = "restart";
    project.readSettingObject(project_path)
      .then(object_model => {
        project
        .executeProject(project_path, object_model, type)
        .then((data) => {
          console.log({ data });
          event.sender.send("restartProjectResult", data);
        })
        .catch((err) => event.sender.send("restartProjectResult", err));
      })
      .catch(err => event.sender.send("restartProjectResult", err))
  });

  ipcMain.on("pauseProject", (event, process_id) => {
    try {
      // kill(process_id, "SIGABRT");
      const os = require("os")
      const child_process = require("child_process")
      if (os.platform() === 'win32') {
        child_process.exec(`taskkill /pid ${process_id.pid} /T /F`, (error, stdout, stderr) => {
          if (error) {
            console.log(`exec error: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        })
      } else {
        process_id.kill();  
      }
      mainWindow.webContents.send("pauseResult", { message: "Pause", status: 1 });
    }
    catch (err) {
      mainWindow.webContents.send("pauseResult", { message: "Error", status: 0 });
    }
  });

  ipcMain.handle("continueProject", async (event, project_path) => {
    let type = "continue";
    project.readSettingObject(project_path)
      .then(object_model => {
        project
        .executeProject(project_path, object_model, type)
        .then((data) => {
          console.log({ data });
          event.sender.send("continueProjectResult", data);
        })
        .catch((err) => event.sender.send("continueProjectResult", err));
      })
      .catch(err => event.sender.send("continueProjectResult", err))
  });

  ipcMain.handle("executeProject", async (event, project_path) => {
    let type = "first";
    project.readSettingObject(project_path)
      .then(object_model => {
        project
        .executeProject(project_path, object_model, type)
        .then((data) => {
          console.log({ data });
          event.sender.send("executeResult", data);
        })
        .catch((err) => event.sender.send("executeResult", err));
      })
      .catch(err => event.sender.send("executeResult", err))
  });

  ipcMain.handle("getProgress", async (event, project_path) => {
    getProgress(project_path)
    .then(data => {
      event.sender.send("getProgressResult", data);
    })
    .catch(err => {
      event.sender.send("getProgressResult", err)
    })
  })

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
      mainWindow.webContents.send("returnHistory", {
        message: data,
        status: 1,
      });
    });
  });
  ipcMain.on("openDir", async (event, name) => {
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: `./${name}`,
    });
    mainWindow.webContents.send("openDirSuccess", {
      message: filePath,
      status: 1,
    });
  });

  ipcMain.on("setProject", (event, data) => {
    project
      .setProject(data)
      .then((result) => {
        mainWindow.webContents.send("setProjectSuccess", result);
      })
      .catch((err) => {
        mainWindow.webContents.send("setProjectSuccess", err);
      });
  });

  ipcMain.on("getProjectById", (event, id) => {
    homepage
      .getProjectById(id)
      .then((data) => {
        project.getProject(data[0].path)
          .then(data => {
            console.log({data: data.projectDetail.children})
            mainWindow.webContents.send("returnProjectById", {
              message: data,
              status: 1,
            });
          })
      })
      .catch((err) => {
        mainWindow.webContents.send("returnProjectById", {
          message: "Can not get project",
          status: 0,
        });
      });
  });

  ipcMain.on("search", (event, name) => {
    homepage
      .search(name)
      .then((data) => {
        mainWindow.webContents.send("searchProject", {
          message: data,
          status: 1,
        });
      })
      .catch((err) => {
        mainWindow.webContents.send("searchProject", {
          message: "Can not search",
          status: 1,
        });
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
