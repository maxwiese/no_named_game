// Config for Canvas
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 400,
    parent: 'container',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
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
let p_name




function preload() {
    this.load.image('sky', 'public/javascript/game/assets/sky.png')
    this.load.spritesheet('stickman', 'public/javascript/game/assets/stickmansprite.png', { frameWidth: 32, frameHeight: 32 })

}

function create() {
    ipcRenderer.send('get_name')
    ipcRenderer.on('name', (event, name) => {

        p_name = name
    })
    if (!p_name) {
        this.add.image(0, 0, 'sky')
        send('gameinit', 'x')

        this.other_players = this.physics.add.group()

        ipcRenderer.on('gameinit', (event, players) => {

            Object.keys(players).forEach((id) => {
                console.log(players)
                if (id === p_name) {
                    addPlayer(this, players[id])
                } else {
                    addOtherPlayer(this, players[id])
                }
            })

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('stickman', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [{ key: 'stickman', frame: 6 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('stickman', { start: 7, end: 12 }),
                frameRate: 10,
                repeat: -1
            });
        })

        ipcRenderer.on('update', (event, players) => {
            console.log(players)
            Object.keys(players).forEach((id) => {
                if (id === p_name) {
                    if (players[id]['current_sid'] > current_sid) {
                        this.player.setPosition(players[id]['x'], players[id]['y'])
                    } /* else if (players[id]['x'] + 10 > this.player.x || players[id]['x'] - 10 > this.player.x || players[id]['y'] + 10 > this.player.y || players[id]['y'] - 10 > this.player.y) {
                    this.player.setPosition(players[id]['x'], players[id]['y'])
                } */
                } else {
                    this.other_players.getChildren().forEach((player) => {
                        console.log(player.playerId)
                        if (players[id]['name'] === player.playerId) {
                            player.setPosition(players[id]['x'], players[id]['y'])
                        }
                    })
                }
            })
        })
    }
}

function update() {
    cursors = this.input.keyboard.createCursorKeys();
    if (this.player) {
        if (cursors.left.isDown) {
            this.player.setPosition(this.player.x - 5, this.player.y)
            this.player.anims.play('left')
            send('move', 'left', current_sid)
            current_sid++
        }
        else if (cursors.right.isDown) {
            this.player.setPosition(this.player.x + 5, this.player.y)
            this.player.anims.play('right')
            send('move', 'right', current_sid)
            current_sid++

        }
        else if (cursors.up.isDown) {
            this.player.setPosition(this.player.x, this.player.y - 5)
            this.player.anims.play('turn')
            send('move', 'up', current_sid)
            current_sid++
        }
        else if (cursors.down.isDown) {
            this.player.setPosition(this.player.x, this.player.y + 5)
            this.player.anims.play('turn')
            send('move', 'down', current_sid)
            current_sid++

        }
        else {
            this.player.anims.play('turn')
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
