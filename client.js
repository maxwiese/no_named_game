const net = require('net')

let client = new net.Socket()
client.connect(3000, '127.0.0.1', () => {
    console.log('connected')
    client.write('Hi Server')
})
client.setEncoding('utf8')
client.on('data', (data) => {
    console.log(data)
})