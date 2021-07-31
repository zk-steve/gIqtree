const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const homepage = require("../src/server/controller/homepage");
function createWindow() {
  // const path = fs.readdirSync("C:\\Users\\ADMIN\\Dev\\webnoithat\\my-app", {
  //   encoding: "utf8",
  // });
  // console.log(path);
  // Create the browser window.
  const win = new BrowserWindow({
    minWidth: 1020,
    minHeight: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  //load the index.html from a url
  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else win.loadFile("../build/index.html");

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools();
  }

  win.once("ready-to-show", () => {
    homepage.getHistory().then((data) => {
      win.webContents.send("getHistory", data);
    });
  });

  ipcMain.on("search", (event, name) => {
    homepage.search(name).then((data) => {
      win.webContents.send("searchProject", data);
    });
  });

  ipcMain.on("minimizeApp", () => {
    console.log("sent");
    win.minimize();
  });
  ipcMain.on("maximizeApp", () => {
    win.maximize();
  });
  ipcMain.on("closeApp", () => {
    win.close();
  });
  ipcMain.on("unmaximizeApp", () => {
    win.unmaximize();
  });
  win.on("maximize", () => {
    win.webContents.send("maximize");
  });
  win.on("unmaximize", () => {
    win.webContents.send("unmaximize");
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here
