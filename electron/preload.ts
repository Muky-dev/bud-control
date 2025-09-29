import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (msg: string) => ipcRenderer.send("message", msg),
  onMessage: (callback: (msg: string) => void) =>
    ipcRenderer.on("reply", (_, msg) => callback(msg)),
});
