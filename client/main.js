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

function disconnect() {
  client.end()
  client.destroy()
}

function send() {
  let msg = document.getElementById("text").value
  client.write('{"Message": "' + msg + '"}')
}
