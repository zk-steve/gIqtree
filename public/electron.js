const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const homepage = require("./server/controller/homepage");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1020,
    minHeight: 600,
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

  mainWindow.once("ready-to-show", () => {
    homepage.getHistory().then((data) => {
      mainWindow.webContents.send("getHistory", data);
    });
  });

  ipcMain.on("search", (event, name) => {
    homepage.search(name).then((data) => {
      mainWindow.webContents.send("searchProject", data);
    });
  });
  mainWindow.on("closed", () => (mainWindow = null));
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