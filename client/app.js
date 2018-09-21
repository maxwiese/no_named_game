const { app, BrowserWindow, ipcMain } = require('electron')
const net = require('net')

let win, client

app.commandLine.appendSwitch('--ignore-gpu-blacklist');

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600, title: 'No Name' })
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
  try {
    client.on('data', (data) => {
      let json_data = JSON.parse(data)
      let action = json_data['action']
      let timestamp = json_data['timestamp']
      let players = json_data['players']

      let send_data = players

      event.sender.send(action, send_data)
    })
  } catch (error) {
    console.error(error)
  }

  client.on('error', (error) => {
    event.sender.send('error', error)
  })
})

ipcMain.on('disconnect', (event, args) => {
  client.end()
  //client.destroy()
})

ipcMain.on('send', (event, args) => {
  //console.log('sending to server fired')
  client.write(`{"${args.command}": "${args.data}", "timestamp": "${args.timestamp}", "sid": "${args.sid}"}`)
})