const { ipcRenderer } = require('electron')

function connect() {
    ipcRenderer.send('connect')
}

function send(command, data) {
   // console.log('sendfunction fired')
    ipcRenderer.send('send', {'command': command, 'data': data, 'timestamp': Date.now()})
}

function disconnect() {
    ipcRenderer.send('disconnect')
}

ipcRenderer.on('connected', (event, args) => {
    document.getElementById('connection').innerHTML = '<i class="material-icons">wifi</i>'
    connection = true
    console.log(`client connected`)
})

ipcRenderer.on('error', (event, args) => {
    console.log(args)
    if (args.code === 'ECONNREFUSED' || args.code === 'ECONNRESET') {
        setTimeout(() => {
            ipcRenderer.send('connect')
          }, 1000)
       //document.getElementById('connection').innerHTML = '<i class="material-icons">wifi_off</i>'
       //document.getElementById('ping').innerHTML = '' 
    }
})

ipcRenderer.on('recived', (event, args) => {

    //handle_response(args)
})
