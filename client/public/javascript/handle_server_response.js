function handle_response(data) {
   // console.log(data)
    if ('timestamp' in data) {
        let recived = Date.now()
        let sended = parseInt(data['timestamp'])
        let delay = recived - sended
        document.getElementById('ping'). innerHTML = delay + ' ms'
    }
    keys = Object.keys(data)
    player_ips = keys.slice(0, keys.length-1)
    if (data[player_ips].name == player_name) {
        if ('state' in data[player_ips]) {
            if (data[player_ips].state == 'mainmenu') {

            } else if (data[player_ips].state == 'lobby') {
                for(player of player_ips) {
                    let playeratdom = document.getElementById(data[player].name)
                    if (playeratdom === null){
                        let tr = document.createElement('tr')
                        tr.innerHTML = `<td id="${data[player].name}">${data[player].name}</td>`
                        document.getElementById('players').appendChild(tr)
                    }
                }

            } else if (data[player_ips].state == 'game') {

            }
        }
    }
}