const { app, BrowserWindow } = require('electron')

let win

app.commandLine.appendSwitch('--ignore-gpu-blacklist');

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600, title: 'No Name'})
  win.loadFile('index.html')
  // Open the DevTools.
  //win.webContents.openDevTools()
  win.on('closed', () => {

    win = null
  })
}
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
