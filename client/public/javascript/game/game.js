// Config for Canvas
var config = {
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'container',
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
let current_sid = 5555

function preload() {
    this.load.image('sky', 'public/javascript/game/assets/sky.png')
    this.load.spritesheet('stickman', 'public/javascript/game/assets/stickmansprite.png', { frameWidth: 32, frameHeight: 32 })
}

function create() {
    last_update = (Date.now() / 1000)
    this.add.image(0, 0, 'sky')
    send('gameinit', 'x')

    this.other_players = this.physics.add.group()

    ipcRenderer.on('gameinit', (event, players) => {

        Object.keys(players).forEach((id) => {
            console.log(players)
            if (players[id]['name'] === player_name) {
                addPlayer(this, players[id])
            } else {
                addOtherPlayer(this, players[id])
            }
        })
    })

    ipcRenderer.on('update', (event, players) => {
        Object.keys(players).forEach((id) => {
            if (players[id]['name'] === player_name) {
                if (players[id]['current_sid'] > current_sid){
                    this.player.setPosition(players[id]['x'], players[id]['y'])
                } else if (players[id]['x']+10>this.player.x  || players[id]['x']-10>this.player.x || players[id]['y']+10>this.player.y || players[id]['y']-10>this.player.y){
                    this.player.setPosition(players[id]['x'], players[id]['y'])
                }
            } else {
                this.all_players.getChildren().forEach((player) => {
                    if (players[id]['name'] === player.playerId) {
                        player.setPosition(players[id]['x'], players[id]['y'])
                    }
                })
            }
        })
    })
}

function update() {
    cursors = this.input.keyboard.createCursorKeys();
    if (this.player) {
        if (cursors.left.isDown) {
            this.player.setPosition(this.player.x -5, this.player.y)
            //this.player.setVelocityX(-160);
            send('move', 'left', current_sid)
            current_sid++
        }
        else if (cursors.right.isDown) {
            this.player.setPosition(this.player.x +5, this.player.y)
            //this.player.setVelocityX(160);
            send('move', 'right', current_sid)
            current_sid++

        }
        else if (cursors.up.isDown) {
            this.player.setPosition(this.player.x, this.player.y -5)
            //this.player.setVelocityY(-160);
            send('move', 'up', current_sid)
            current_sid++
        }
        else if (cursors.down.isDown) {
            this.player.setPosition(this.player.x, this.player.y +5)
            //this.player.setVelocityY(160);
            send('move', 'down', current_sid)
            current_sid++

        }
        else {
            //this.player.setVelocityX(0);
            //this.player.setVelocityY(0)
        }

        // save old position data
        this.player.oldPosition = {
            x: this.player.x,
            y: this.player.y,
            sid: current_sid
        };
    }

}

function addPlayer(self, player) {
    self.player = self.physics.add.sprite(player.x, player.y, 'stickman')
    self.player.playerId = player.name
}

function addOtherPlayer(self, player) {
    let current_player = self.physics.add.sprite(player.x, player.y, 'stickman')
    //current_player.setBounce(0.2);
    //current_player.setCollideWorldBounds(true);
    current_player.playerId = player.name
    self.other_players.add(current_player)
}
