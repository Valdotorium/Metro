function setupCameraControls(game){
    const layer = game.tileMap.layer
    const cursors = game.input.keyboard.createCursorKeys();

    const controlConfig = {
        camera: game.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 1/game.cameras.main.zoom
    };

    game.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

    game.cameras.main.setBounds(0,0, layer.width * layer.scale + 200, layer.height * layer.scale + 200);
}

function zoomControls(game){
    //zoom in or out if a or d are pressed
    if (game.keys.get("A").isDown && game.cameras.main.zoom < 5) {
        game.cameras.main.zoom += 0.01;
        game.controls.speed = 4/game.cameras.main.zoom;
    }
    if (game.keys.get("D").isDown && game.cameras.main.zoom > 0.3) {
        game.cameras.main.zoom -= 0.01;
        game.controls.speed = 4/game.cameras.main.zoom;
    }
}

export function setupControls(game){
    setupCameraControls(game)
}

export function updateControls (game) {
    zoomControls(game);
}