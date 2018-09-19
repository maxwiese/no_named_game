const { app, BrowserWindow, ipcMain } = require('electron')
const net = require('net')

let win, client

app.commandLine.appendSwitch('--ignore-gpu-blacklist');

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600, title: 'No Name'})
  win.loadURL(`file://${__dirname}/index.html`)
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

ipcMain.on('connect', (event, args) => {
  client = new net.Socket()
  client.connect(3000, '127.0.0.1', () => {
    event.sender.send('connected')
  })

  client.setEncoding('utf8')
  client.on('data', (data) => {
    event.sender.send('recived', JSON.parse(data))
  })
  client.on('error', (error) => {
    event.sender.send('error', error)
  })
})

ipcMain.on('disconnect', (event, args) => {
  client.end()
  client.destroy()
})

ipcMain.on('send', (event, args) => {
  client.write(`{"${args.command}": "${args.data}", "timestamp": "${args.timestamp}"}`)
})