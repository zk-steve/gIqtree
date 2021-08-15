const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");
const isDev = require("electron-is-dev");
const homepage = require("./server/controller/homepage");

const { v4: uuidv4 } = require("uuid");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1440,
    minHeight: 900,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on("selectDialog", async (event, project_id) => {
    try {
      // Step 1: Choose msa file and get path and name of it
      const filePath = dialog.showOpenDialogSync({
        properties: ["multiSelections"],
        filters: [{ name: "IQTREE", extensions: ["msa"] }],
      });
      if (!filePath) {
        mainWindow.webContents.send("cancelSelect", { canceled: 1 });
      } else {
        const fileName = filePath.map((element) => {
          let result = element.split("\\");
          if (!result) {
            result = element.split("/");
          }
          return result[result.length - 1];
        });
        console.log({ filePath, fileName });
        // Step 2: Copy input file into folder input of project
        let projectPath;
        await homepage.getProjectById(project_id).then((data) => {
          projectPath = path.join(data[0].path, "input");
        });

        let status = 1;
        let inputs_id = [];
        for (let i = 0; i < filePath.length; i++) {
          let elementPath = path.join(projectPath, fileName[i]);
          fs.copyFile(filePath[i], elementPath, (err) => {
            if (err) throw err;
            else console.log("Copy successfully");
          });

          // Step 3: Insert input path into input table
          let exist = 0;
          await homepage.getInputByPath(elementPath).then((data) => {
            console.log({ data, elementPath });
            if (data.length === 0) {
              let input_id = uuidv4();
              inputs_id.push(input_id);
              homepage
                .setInput(input_id, fileName[i], elementPath, project_id)
                .then(() => {
                  console.log(
                    `Insert file ${fileName[i]} into project ${project_id} successfully`
                  );
                });
            } else {
              console.log({
                message: "Input file is exists",
              });
              exist = 1;
            }
          });
          if (exist === 1) {
            status = 0;
            break;
          }
        }
        let result = [];
        for (let i = 0; i < fileName.length; i++){
          result.push({input_id: inputs_id[i], file_name: fileName[i], file_path: filePath[i]})
        }
        console.log({ result, status });
        let message = status ? result : "File is exists";
        mainWindow.webContents.send("selectFile", {
          message: message,
        });
      }
    } catch (err) {
      console.log({ err });
    }
  });

  ipcMain.on("deleteInput", async (event, inputData) => {
    const { input_id, project_id } = inputData;
    console.log(inputData);
    try {
      await homepage.deleteInput(input_id, project_id).then((data) => {
        console.log({ data });
        mainWindow.webContents.send("deleteResult", { data });
      });
    } catch (err) {
      console.log("fail");
      mainWindow.webContents.send("deleteResult", {
        message: "Does not delete it",
      });
    }
  });

  ipcMain.on("getHistory", () => {
    homepage.getHistory().then((data) => {
      mainWindow.webContents.send("returnHistory", data);
    });
  });
  ipcMain.on("openDir", async (event, name) => {
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: `./${name}`,
    });
    mainWindow.webContents.send("openDirSuccess", { filePath });
  });

  ipcMain.on("setProject", (event, data) => {
    const { name, filePath } = data;
    if (!fs.existsSync(filePath)) {
      fs.mkdir(filePath, { recursive: true }, (err) => {
        if (err) throw err;
        else {
          console.log("created");
          const input = path.join(filePath, "input");
          const output = path.join(filePath, "output");
          fs.mkdir(input, { recursive: true }, (err) => {
            if (err) throw err;
            else console.log("Created input folder");
          });
          fs.mkdir(output, { recursive: true }, (err) => {
            if (err) throw err;
            else console.log("Created input folder");
          });
        }
      });
      let project_id = uuidv4();
      console.log(project_id);
      homepage.setProject(name, filePath, project_id).then((data) => {
        mainWindow.webContents.send("setProjectSuccess", data);
      });
    }
  });

  ipcMain.on("getProjectById", (event, id) => {
    homepage.getProjectById(id).then((data) => {
      mainWindow.webContents.send("returnProjectById", data);
    });
  });

  ipcMain.on("getProject", (event) => {
    homepage.getProjects().then((data) => {
      mainWindow.webContents.send("getProject", data);
    });
  });

  ipcMain.on("getInput", (event) => {
    homepage.getInput().then((data) => {
      console.log(data);
      mainWindow.webContents.send("getInput", data);
    });
  });

  ipcMain.on("getOutput", (event) => {
    homepage.getOutput().then((data) => {
      mainWindow.webContents.send("getOutput", data);
    });
  });

  ipcMain.on("search", (event, name) => {
    homepage.search(name).then((data) => {
      mainWindow.webContents.send("searchProject", data);
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
  if (process.platform !== "darwin") {
    app.quit();
    app.exit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
