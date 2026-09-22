const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("desktop", {
  electronVersion: process.versions.electron,
});
