//JUST FOR DEMO FIXED 3 FRAMES
const FRAMES = 3

const images = [
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/0/0aafd5ef37d15a70c4b3da1ce2325ef828da9f57.png',
    alt: 'body0-0'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/5/53d6c4598a2b989049a2d4fd6a9e1576cdbb59cf.png',
    alt: 'body0-1'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/d/de3fbb16f0a22946c2cc2f22b196b0d8dec42763.png',
    alt: 'body1-0'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/5/55397809e7adc15fad03facfcd50077b1980de49.png',
    alt: 'body1-1'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/7/72d87a63a541c72301d435697b529e6db9ba9c26.png',
    alt: 'body2-0'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/9/96a72c4280d75d8f07e8a8aa6fb8b887c62f177d.png',
    alt: 'body2-1'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/c/c612dd8b2e2fdbdd80e9a36886dc1fa502472e65.png',
    alt: 'head0-0'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/b/b27d5777342e6cbf4b5dc9e2b28f0bd3bfe197b9.png',
    alt: 'head1-0'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/b/b27d5777342e6cbf4b5dc9e2b28f0bd3bfe197b9.png',
    alt: 'head2-0'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/c/c612dd8b2e2fdbdd80e9a36886dc1fa502472e65.png',
    alt: 'head0-1'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/b/b27d5777342e6cbf4b5dc9e2b28f0bd3bfe197b9.png',
    alt: 'head1-1'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/b/b27d5777342e6cbf4b5dc9e2b28f0bd3bfe197b9.png',
    alt: 'head2-1'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/c/ce305bdebea403da697b7dfe6dcfec9a4fd91faa.png',
    alt: 'legs0-0'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/c/ce305bdebea403da697b7dfe6dcfec9a4fd91faa.png',
    alt: 'legs1-0'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/c/ce305bdebea403da697b7dfe6dcfec9a4fd91faa.png',
    alt: 'legs2-0'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/c/ce305bdebea403da697b7dfe6dcfec9a4fd91faa.png',
    alt: 'legs0-1'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/c/ce305bdebea403da697b7dfe6dcfec9a4fd91faa.png',
    alt: 'legs1-1'
  },
  {
    url: 'https://canada1.discourse-cdn.com/free1/uploads/phaser1/original/2X/c/ce305bdebea403da697b7dfe6dcfec9a4fd91faa.png',
    alt: 'legs2-1'
  }
]

export default class SceneMain extends Phaser.Scene {
  preload() {
    for (const img of images) {
      this.load.image(img.alt, img.url)
    }
  }

  updatePlayerTexture(hType: 0 | 1, bType: 0 | 1, lType: 0 | 1, player: Phaser.GameObjects.Sprite) {
    // TEXTURE AND FRAMES
    if (this.textures.exists('player')) {
      this.textures.remove('player')
    }

    const canvas = this.textures.createCanvas('player', 42 * FRAMES, 68)

    for (let idx = 0; idx < FRAMES; idx++) {
      this.drawPlayerSpriteFrame(canvas, idx, hType, bType, lType)
      canvas?.add(idx, 0, 42 * idx, 0, 42, 68)
    }
    canvas?.refresh()

    if (player) {
      player.setTexture('player')
    }

    // ANIMATIONS
    if (this.anims.exists('walk')) {
      this.anims.remove('walk')
    }

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', {
        start: 1,
        end: 2
      }),
      frameRate: 2,
      repeat: -1
    })

    this.renderTexture()
  }

  create() {
    const DEFAULT_TYPE = 0
    const headType = DEFAULT_TYPE
    const bodyType = DEFAULT_TYPE
    const legsType = DEFAULT_TYPE

    this.info = this.add.text(320 - 10, 10, 'Player customization').setOrigin(1, 0)

    const player = this.add.sprite(320 / 2, 240 / 2, 'player').setScale(2)
    this.updatePlayerTexture(headType, bodyType, bodyType, player)

    player.play('walk')
    const body0 = this.add.image(40, 40, 'body0-0').setInteractive()
    const body1 = this.add.image(40, 80, 'body0-1').setInteractive()

    body0.on('pointerdown', () => {
      player.stop()
      this.updatePlayerTexture(headType, 0, bodyType, player)
      player.play('walk')
    })
    body1.on('pointerdown', () => {
      player.stop()
      this.updatePlayerTexture(headType, 1, bodyType, player)
      player.play('walk')
    })
  }

  drawPlayerSpriteFrame(canvas, idx, hType: 0 | 1, bType: 0 | 1, lType: 0 | 1) {
    const offsets = [
      { legs: 0, body: 0, head: 0 },
      { legs: 2, body: -2, head: 0 },

      { legs: 2, body: -2, head: 0 }
    ]
    canvas.drawFrame(`legs${idx}-${lType}`, null, 42 * idx, 46 + offsets[idx].legs)
    canvas.drawFrame(`body${idx}-${bType}`, null, 42 * idx, 34 + offsets[idx].body)
    canvas.drawFrame(`head${idx}-${hType}`, null, 42 * idx, 2 + offsets[idx].head)
  }

  renderTexture() {
    const rt = this.add.renderTexture(0, 0, 42 * FRAMES, 68)
  }
}

console.clear()
