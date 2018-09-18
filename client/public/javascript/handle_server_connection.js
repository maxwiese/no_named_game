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
    document.getElementById('connection').innerHTML = '<i class="material-icons">wifi</i>'
    
    console.log(`client connected`)
})

ipcRenderer.on('error', (event, args) => {
    console.log(args.code)
    if (args.code === 'ECONNREFUSED' || args.code === 'ECONNRESET') {
        setTimeout(() => {
            ipcRenderer.send('connect')
          }, 1000)
       document.getElementById('connection').innerHTML = '<i class="material-icons">wifi_off</i>'
       document.getElementById('ping').innerHTML = '' 
    }
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
