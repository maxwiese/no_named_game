// Config for Canvas
var config = {
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

var game = new Phaser.Game(config)



function preload() {
    this.load.image('sky', 'public/javascript/game/assets/sky.png')
    this.load.spritesheet('stickman', 'public/javascript/game/assets/stickmansprite.png', { frameWidth: 32, frameHeight: 32 })
}

function create() {
    //load background
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'sky')

    this.otherPlayers = this.physics.add.group();

    send('gameinit', 'x')
    ipcRenderer.on('gameinit', (event, data) => {
        console.log(data)

        player_ips = Object.keys(data)

        for (player of player_ips) {
            console.log(player)
            if (data[player]['name'] === player_name) {
                addPlayer(this, data[player])
            } else {
                addOtherPlayers(this, data[player])
            }
        }
        this.anims.create({
            //key: 'left',
            key: 'right',
            //frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frames: this.anims.generateFrameNumbers('stickman', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            //frames: [{ key: 'dude', frame: 4 }],
            frames: [{ key: 'stickman', frame: 6 }],
            frameRate: 20
        });

        this.anims.create({
            //key: 'right',
            key: 'left',
            //frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frames: this.anims.generateFrameNumbers('stickman', { start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            //key: 'right',
            key: 'leftinair',
            //frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frames: [{ key: 'stickman', frame: 9 }],
            frameRate: 20,
        });

        this.anims.create({
            //key: 'right',
            key: 'rightinair',
            //frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frames: [{ key: 'stickman', frame: 2 }],
            frameRate: 20,
        });

    })
}

function update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.player) {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            if (this.player.body.touching.down) {
                this.player.anims.play('left', true);
            } else {
                this.player.anims.play('leftinair');
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            if (this.player.body.touching.down) {
                this.player.anims.play('right', true);
            } else {
                this.player.anims.play('rightinair');
            }

        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

        // emit player movement
        let x = this.player.x;
        let y = this.player.y;
        if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)) {
            send('move', { x: this.player.x, y: this.player.y, });
        }

        // save old position data
        this.player.oldPosition = {
            x: this.player.x,
            y: this.player.y,
        }
    }

}

function addPlayer(self, playerInfo) {
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'stickman')
    self.player.setBounce(0.2);
    self.player.setCollideWorldBounds(true);


}

function addOtherPlayers(self, playerInfo) {
    let otherplayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'stickman')
    otherplayer.setBounce(0.2);
    otherplayer.setCollideWorldBounds(true);

    self.OtherPlayers.add(otherplayer)
}
