// Config for Canvas
var config = {
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            //gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

var game = new Phaser.Game(config)

let last_update

function preload() {
    this.load.image('sky', 'public/javascript/game/assets/sky.png')
    this.load.spritesheet('stickman', 'public/javascript/game/assets/stickmansprite.png', { frameWidth: 32, frameHeight: 32 })
}

function create() {
    last_update = (Date.now()/1000)
    this.add.image(window.innerWidth/2, window.innerHeight/2, 'sky')
    send('gameinit', 'x')

    this.all_players = this.physics.add.group()

    ipcRenderer.on('gameinit', (event, players) => {
        Object.keys(players).forEach((id) => {
            console.log(players)
            addPlayer(this, players[id])
        })
    })

    ipcRenderer.on('update', (event, players) => {
            this.all_players.getChildren().forEach((player) => {
                Object.keys(players).forEach((id) => {
                    if(players[id]['name'] === player.playerId) {
                        player.setPosition(players[id]['x'], players[id]['y'])
                    }
                })
            })
    })
}

function update() {
    if(last_update+1 < (Date.now()/1000)) {
        send('update', 'x')
        last_update = (Date.now()/1000)
        //console.log('update')
    }


    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        //player.setVelocityX(-160);
        send('move', 'left')
    }
    else if (cursors.right.isDown) {
        //player.setVelocityX(160);
        send('move', 'right')
        
    }
    else if (cursors.up.isDown) {
        //player.setVelocityX(-160);
        send('move', 'up')
    }
    else if (cursors.down.isDown) {
        //player.setVelocityX(160);
        send('move', 'down')
        
    }
    else {
        //player.setVelocityX(0);
    }
    
}

function addPlayer(self, player) {
    let current_player = self.physics.add.sprite(player.x, player.y, 'stickman')
    current_player.setBounce(0.2);
    current_player.setCollideWorldBounds(true);
    current_player.playerId = player.name
    self.all_players.add(current_player)
}
