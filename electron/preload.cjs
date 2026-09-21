const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("gurukrupan", {
  database: {
    getStatus: () => ipcRenderer.invoke("database:status"),
  },
});
