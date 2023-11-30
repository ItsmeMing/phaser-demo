import Phaser from 'phaser'
import attackSheathe from 'src/assets/spritesheets/attack-sheathe.png'
import attackSheatheJSON from 'src/assets/spritesheets/attack-sheathe.json'
import playerShoot from 'src/assets/spritesheets/player-shoot.png'
import playerShootJSON from 'src/assets/spritesheets/player-shoot.json'
import playerRun from 'src/assets/spritesheets/player-katana-run.png'
import playerRunJSON from 'src/assets/spritesheets/player-katana-run.json'

export default class SceneMain extends Phaser.Scene {
  private player
  constructor(player: any) {
    super('SceneMain')
    this.player = player
  }
  preload() {
    this.load.atlas('player-shoot', playerShoot, playerShootJSON)
    this.load.atlas('player-attack', attackSheathe, attackSheatheJSON)
    this.load.atlas('player-run', playerRun, playerRunJSON)
  }
  create() {
    this.anims.create({
      key: 'shoot',
      frames: this.anims.generateFrameNames('player-shoot', {
        start: 0,
        end: 9,
        zeroPad: 0,
        prefix: 'player shoot 2H 48x48-',
        suffix: '.png'
      }),
      frameRate: 24
    })
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('player-attack', {
        start: 0,
        end: 8,
        zeroPad: 0,
        prefix: 'attack-sheathe-',
        suffix: '.png'
      }),
      frameRate: 12
    })
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('player-run', {
        start: 0,
        end: 7,
        zeroPad: 0,
        prefix: 'player katana run 48x48-',
        suffix: '.png'
      }),
      frameRate: 14
    })
    const space = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    let isRunning = false
    this.player = this.add.sprite(200, 200, 'player-run')
    console.log(this.player)
    this.player.play('run')
    space?.on('down', (key, e) => {
      this.player.stop('run')
      this.player.play('attack')
    })
    this.input.keyboard.on('keydown-W', (event) => {
      // Play the 'walk' animation when the W key is pressed
      if (!isRunning)
        this.player.anims.play('run').on('animationcomplete', () => this.player.anims.play('run'))
      isRunning = true
    })

    this.input.keyboard.on('keyup-W', (event) => {
      // Stop the animation when the W key is released
      this.player.anims.stop('run')
      isRunning = false
    })
  }
  update() {}
}
