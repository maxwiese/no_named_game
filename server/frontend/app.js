const { app, BrowserWindow } = require('electron')
const path = require('path');
const cluster = require('cluster');

let win

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600, title: 'No Name', show: false})
  win.loadURL(`file://${__dirname}/views/index.html`)

  win.once('ready-to-show', () => win.show())

  win.on('closed', () => {

    win = null
  })
}

app.on('ready', createWindow)

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
