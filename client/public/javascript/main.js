const net = require('net')
let client

document.getElementById("hide").style.display = "none";

function main() {
  let canvas = document.createElement('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 4;

  document.body.appendChild(canvas);

  let gl = canvas.getContext('webgl');

  gl.clearColor(1, 0, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function connect() {
  client = new net.Socket()

  console.log("joining")
  client.connect(3000, '127.0.0.1', () => {
    // Einfach damit es schöner ausschaut
    document.getElementById("connect").innerHTML = "Connected"
    document.getElementById("disconnect").innerHTML = "Disconnect";
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
  // Einfach damit es schöner ausschaut
  document.getElementById("disconnect").innerHTML = "Disconnected";
  document.getElementById("connect").innerHTML = "Connect";
}

function send() {
  let msg = document.getElementById("text").value
  client.write('{"Message": "' + msg + '"}')
}
