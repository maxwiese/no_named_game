const net = require('net')

clients = []

let server = net.createServer((socket) => {
    console.log(socket.remoteAddress+ ':' +socket.remotePort)
    clients.push(socket)
    socket.write(`Hello World`)
    socket.setEncoding('utf8')
    socket.on('data', (data) => {
        console.log(data)
        broadcast(data)
    })
}).listen(3000, '127.0.0.1', () => {
    console.log(`Server listen to ${server.address()}`)
})

function broadcast(message) {
    clients.map((client) => {
        client.write(message)
    })
}