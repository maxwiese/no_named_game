module.exports = {
    //function to broadcast to all players
    broadcast: (action, clients, message) => {
        clients.map((client) => {
            message['action'] = action
            message['timestamp'] = Date.now()
            client.write(JSON.stringify(message))
        })
    },

    // send only to one client
    send: (action, client, message) => {
        message['action'] = action
        message['timestamp'] = Date.now()
        client.write(JSON.stringify(message))
    }

    //updateProcess: (socket)
}