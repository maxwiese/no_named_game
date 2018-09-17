const net = require('net')
const player_actions = require('./player_actions')
const global_actions = require('./global_actions')

const interval = 500

let clients = []
let players = {}

//create the server
let server = net.createServer((socket) => {
  let socket_address = `${socket.remoteAddress}${socket.remotePort}`

  //print out client adress
  console.log(`new client: ${socket_address}`)

  //adding socket to clientlist
  clients.push(socket)

  //adding player to global obj using address as key
  players[socket_address] = {}

  //set the datatype to utf-8
  socket.setEncoding('utf8')

  //handle error event
  socket.on('error', (error) => {
    if (error.code === 'ECONNRESET') {
      delete players[socket_address]
      socket.destroy()
    }
  })

  //handle disconnect event
  socket.on('close', () => {
    delete players[socket_address]
    console.log("exited")
  })

  //init eventhandler for some game relevant events
  socket.on('data', (data) => {
    try {

      //parsing incomming data into Json
      data = JSON.parse(data)

      if (data.hasOwnProperty('message')) {
        //handle Message event
        global_actions.broadcast(clients, data)
      }
      if (data.hasOwnProperty('setname')) {
        //handle setname event
        player_name = data['setname']
        players[socket_address]['name'] = player_name
        //global_actions.broadcast(`{"player": "${playername} joined the game"}`)
      }
      if (data.hasOwnProperty('join')) {
        //give the player start coordinate
        players[socket_address]['x'] = 0
        players[socket_address]['y'] = 0
      }
      if (data.hasOwnProperty('move')) {
        //handle move from player, direction is given in data section
        direction = JSON.parse(player_actions.move(data['move']))
        players[socket_address][Object.keys(direction)] += parseInt(direction[Object.keys(direction)])
      }
      if (data.hasOwnProperty('update')) {
        //send updatet data to all clients
        global_actions.broadcast(clients, players)
      }

    } catch (e) {
      throw e
    }
  })
})

// errorhandling
server.on('error', (error) => {

  //handle error if port in use (restart server every secound)
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
  setInterval(() => {
    global_actions.broadcast(clients, players)
  }, interval)
})
