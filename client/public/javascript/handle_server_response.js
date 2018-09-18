function handle_response(data) {
    console.log(data)
    if ('timestamp' in data) {
        let recived = Date.now()
        let sended = parseInt(data['timestamp'])
        let delay = recived - sended
        document.getElementById('ping'). innerHTML = delay + ' ms'
    }
/*     for (obj in data) {
        if (data[obj].hasOwnProperty('name')) {
            cube.position.set(data[obj].x/10, data[obj].y/10, 1)
            console.log(cube.position)
        }        
    } */
}