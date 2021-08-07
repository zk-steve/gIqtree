const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");
const isDev = require("electron-is-dev");
const homepage = require("./server/controller/homepage");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1440,
    minHeight: 900,
    frame: true,
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

  ipcMain.on("getHistory", () => {
    homepage.getHistory().then((data) => {
      mainWindow.webContents.send("returnHistory", data);
    });
  });

  ipcMain.on("setProject", async (event, name) => {
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: "./IQTREE_Example",
    });
    if (!fs.existsSync(filePath)) {
      fs.mkdir(filePath, { recursive: true }, (err) => {
        if (err) throw err;
        else console.log("created");
      });
      await homepage.setProject(name, path).then(() => {
        mainWindow.webContents.send({ name, path });
      });
    }
  });

  ipcMain.on("setInput", (event, name, path, projectId) => {
    homepage.setInput(name, path, projectId).then(() => {});
  });

  ipcMain.on("setOutput", (event, name, path, projectId) => {
    homepage.setOutput(name, path, projectId).then(() => {});
  });

  ipcMain.on("getProject", (event) => {
    homepage.getProjects().then((data) => {
      mainWindow.webContents.send("getProject", data);
    });
  });

  ipcMain.on("getInput", (event) => {
    homepage.getInput().then((data) => {
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
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
