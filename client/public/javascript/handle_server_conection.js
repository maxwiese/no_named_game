const net = require('net')
let client


function connect_all(){
  connect()
  setTimeout(() => {
    setname()
    join()
    alert("now you can move")
  }, 1000)
}

function connect() {
  client = new net.Socket()

  console.log("joining")
  client.connect(3000, '127.0.0.1', () => {
    // Braucht man nicht unbediengt
    //document.getElementById("connect").innerHTML = "Connected";
  })

  client.setEncoding('utf8')
  client.on('data', (data) => {
    let parseddata = JSON.parse(data)
    if (parseddata.hasOwnProperty('timestamp')) {
      let recived = Date.now()
      let sended = parseInt(parseddata['timestamp'])
      let delay = recived - sended
      console.log(`delay : ${delay}ms`)
    }

    handle_response(parseddata)

/*     let msg = document.createElement("p")
    msg.innerHTML = JSON.stringify(parseddata)
    document.getElementById("content").appendChild(msg) */
  })
}

//function to disconnect
function disconnect() {
  window.location = 'index.html';
  client.end()
  client.destroy()
}

function setname() {
  let name = 'max'
  send('setname', name)
}

function join() {
  send('join', 'x')
}

function sending() {
  let command = document.getElementById("command").value
  let data = document.getElementById("data").value
  send(command, data)
}

//send some command
function send(command, data) {
  let timestamp = Date.now()
  client.write(`{"${command}": "${data}", "timestamp": "${timestamp}"}`)
}
