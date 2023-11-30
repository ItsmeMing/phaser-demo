import Phaser from 'phaser'
import SceneMain from './scenes/MainScene'

function launch(container_id: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 400,
    height: 800,
    parent: container_id,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [SceneMain]
  })
}

export default launch
