const net = require('net')

let clients = []

let server = net.createServer((socket) => {
  console.log(socket.remoteAddress + ':' + socket.remotePort)
  clients.push(socket)

  socket.setEncoding('utf8')

  socket.on('data', (data) => {
    try {
      data = JSON.parse(data)
      if (data.hasOwnProperty('Message')) {
        broadcast(data)
      } else {
        console.log(data)
      }

    } catch (e) {
      throw e
    }
  })
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log('Host address is in use, retryning ...')
    setTimeout(() => {
      server.close()
      server.listen(3000, '127.0.0.1', () => {
        console.log('server on', server.address())
      })
    }, 1000)
  }
})

server.listen(3000, '127.0.0.1', () => {
  console.log('server on ', server.address())
})

function broadcast(message) {
  clients.map((client) => {
      client.write(JSON.stringify(message));
      })
  }
