document.addEventListener('keydown', (event) => {
    if (event.key == 'w'){
        send('move', 'up')
        //send('update', 'x')
    } else if (event.key == 's') {
        send('move', 'down')
        //send('update', 'x')
    } else if (event.key == 'a') {
        send('move', 'left')
        //send('update', 'x')
    } else if (event.key == 'd') {
        send('move', 'right')
        //send('update', 'x')
    }
})