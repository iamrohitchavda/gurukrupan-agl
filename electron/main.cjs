const path = require("node:path");
const { app, BrowserWindow, ipcMain } = require("electron");
const { closeDatabase, getDatabaseStatus } = require("./database.cjs");

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 760,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  if (app.isPackaged) {
    window.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  } else {
    window.loadURL("http://localhost:1420");
  }
}

app.whenReady().then(() => {
  ipcMain.handle("database:status", () => getDatabaseStatus());
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", closeDatabase);
