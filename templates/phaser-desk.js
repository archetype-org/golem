import { cruft } from '../partials/cruft.js'
import { crudAgent } from '../partials/crud-agent.js'
import { itemFiles } from '../partials/item-files.js'

function crudDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
    ...crudAgent(shipName, deskName),
    ...itemFiles(shipName, deskName),
    {
        path: `apps/${deskName}/ui`,
        name: `index.html`,
        content: `
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser-arcade-physics.min.js"></script>
</head>
<body>

    <script>
    class Example extends Phaser.Scene
    {
        preload ()
        {
            this.load.setBaseURL('https://labs.phaser.io');

            this.load.image('sky', 'assets/skies/space3.png');
            this.load.image('logo', 'assets/sprites/phaser3-logo.png');
            this.load.image('red', 'assets/particles/red.png');
        }

        create ()
        {
            this.add.image(400, 300, 'sky');

            const particles = this.add.particles(0, 0, 'red', {
                speed: 100,
                scale: { start: 1, end: 0 },
                blendMode: 'ADD'
            });

            const logo = this.physics.add.image(400, 100, 'logo');

            logo.setVelocity(100, 200);
            logo.setBounce(1, 1);
            logo.setCollideWorldBounds(true);

            particles.startFollow(logo);
        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: Example,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        }
    };

    const game = new Phaser.Game(config);
    </script>

</body>
</html>        
  `
    },
  ]
  return { files }
}

export default crudDesk
