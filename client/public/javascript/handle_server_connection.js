const { ipcRenderer } = require('electron')

function connect() {
    ipcRenderer.send('connect')
}

function send(command, data) {
    ipcRenderer.send('send', {'command': command, 'data': data, 'timestamp': Date.now()})
}

function disconnect() {
    ipcRenderer.send('disconnect')
}

ipcRenderer.on('connected', (event, args) => {
    document.getElementById('connection').innerHTML = "connected"
    
    console.log(`client connected`)
})

ipcRenderer.on('recived', (event, args) => {
    if ('timestamp' in args) {
        let recived = Date.now()
        let sended = parseInt(args['timestamp'])
        let delay = recived - sended
        document.getElementById('ping'). innerHTML = delay + ' ms'
    }
    handle_response(args)
})
