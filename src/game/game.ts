import Phaser from 'phaser'

function launch(container_id: string, scene: any) {
  return new Phaser.Game({
    type: Phaser.CANVAS,
    width: 320,
    height: 240,
    parent: container_id,
    pixelArt: true,
    physics: {
      default: 'arcade'
    },
    banner: false,
    scene: [scene]
  })
}

export default launch
