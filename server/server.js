const net = require('net')
const player_actions = require('./player_actions')

let clients = []
let players = {}

//create the server
let server = net.createServer((socket) => {
<<<<<<< HEAD
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
=======
  let socket_address = `${socket.remoteAddress}${socket.remotePort}`

  //print out client adress
  console.log(`new client: ${socket_address}`)

  //adding socket to clientlist
  clients.push(socket)

  //adding player to global obj using address as key
  players[socket_address] = {}

  //set the datatype to utf-8
  socket.setEncoding('utf8')

  //handle disconnect event
  socket.on('close', () => {
    console.log("exited")
  })

  //init eventhandler for some game relevant events
  socket.on('data', (data) => {
    try {

      //parsing incomming data into Json
      data = JSON.parse(data)

      if (data.hasOwnProperty('message')) {
        //handle Message event
      }
      if (data.hasOwnProperty('setname')) {
        //handle setname event
        player_name = data['setname']
        players[socket_address]["name"] = player_name
        //broadcast(`{"player": "${playername} joined the game"}`)
      }
      if (data.hasOwnProperty('join')) {
        //give the player start coordinates
        players[socket_address]["x"] = 50
        players[socket_address]["y"] = 50
      }
      if (data.hasOwnProperty('move')) {
        //handle move from player, direction is given in data section
        direction = JSON.parse(player_actions.move(data['move']))
        players[socket_address][Object.keys(direction)] += parseInt(direction[Object.keys(direction)])
      }
      if (data.hasOwnProperty('update')) {
        //send updatet data to all clients
        broadcast(players)
      }
>>>>>>> dev_markus

    } catch (e) {
      throw e
    }
  })
})

// errorhandling
server.on('error', (error) => {
<<<<<<< HEAD
=======

  //handle error if port in use (restart server every secound)
>>>>>>> dev_markus
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

//start the server
server.listen(3000, '127.0.0.1', () => {
  console.log('server on ', server.address())
})

//function to broadcast to all players
function broadcast(message) {
  clients.map((client) => {
<<<<<<< HEAD
      client.write(JSON.stringify(message)
      })
  }
=======
    client.write(JSON.stringify(message))
  })
}
>>>>>>> dev_markus
