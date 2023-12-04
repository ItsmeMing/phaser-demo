import { ref } from 'vue'

import Phaser from 'phaser'

const isRunning = ref(false)

export default class SceneMain2 extends Phaser.Scene {
  constructor() {
    super('SceneMain')
  }
  preload() {
    this.load.atlas('player-idle', 'src/assets/spritesheets/idle.png', 'src/assets/spritesheets/idle.json')
    this.load.atlas('player-shoot', 'src/assets/spritesheets/shoot.png', 'src/assets/spritesheets/shoot.json')
    this.load.atlas('player-attack', 'src/assets/spritesheets/attack-sheathe.png', 'src/assets/spritesheets/attack-sheathe.json')
    this.load.atlas('player-run', 'src/assets/spritesheets/run.png', 'src/src/assets/spritesheets/run.json')
  }
  create() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('player-idle', {
        start: 0,
        end: 9,
        zeroPad: 0,
        prefix: 'Character Idle 48x48-',
        suffix: '.png'
      }),
      repeat: -1,
      frameRate: 24
    })
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

    this.info1 = this.add.text(50, 10, 'Actions:')
    this.info2 = this.add.text(50, 30, 'W: Run')
    this.info3 = this.add.text(50, 50, 'Space: Attack')
    const space = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    const player = this.add.sprite(200, 200, 'player-idle')
    player.play('idle')
    space?.on('down', () => {
      if (player.anims.currentAnim?.key === 'attack') return
      player.play('attack').on('animationcomplete', () => {
        player.play('idle')
      })
    })
    this.input.keyboard?.on('keydown-W', () => {
      // Play the 'walk' animation when the W key is pressed
      if (player.anims.currentAnim?.key === 'run') return
      player.anims.play('run').on('animationcomplete', () => {
        player.anims.play('run')
      })
    })

    this.input.keyboard?.on('keyup-W', () => {
      // Stop the animation when the W key is released
      if (player.anims.currentAnim?.key === 'run') {
        player.play('idle')
        isRunning.value = false
      }
    })
  }
  update() {}
}
