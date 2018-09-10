const net = require('net')
let client

function connect() {
  client = new net.Socket()

  console.log("joining")
  client.connect(3000, '127.0.0.1', () => {
    document.getElementById("connect").innerHTML = "Connected"
  })

  client.setEncoding('utf8')
  client.on('data', (data) => {
    let msg = document.createElement("p")
    msg.innerHTML = data
    document.getElementById("content").appendChild(msg)
  })
}

//function to disconnect
function disconnect() {
  client.end()
  client.destroy()
}

function sending() {
  let command = document.getElementById("command").value
  let data = document.getElementById("data").value
  send(command, data)
}

//send some command
function send(command, data) {
  client.write(`{"${command}": "${data}"}`)
}
