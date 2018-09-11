module.exports = {
    //function to broadcast to all players
    broadcast: (clients, message) => {
        clients.map((client) => {
            message['timestamp'] = Date.now()
            client.write(JSON.stringify(message))
        })
    },

    // send only to one client
    send: (client, message) => {
        message['timestamp'] = Date.now()
        client.write(JSON.stringify(message))
    }
}