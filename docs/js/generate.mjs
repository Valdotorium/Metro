export function generateTilemap(game){
    //get the tilemap size
    const mapSize = game.tileMapOptions.get("size")

    console.log("map size is: ", mapSize)

    game.tileMap = game.make.tilemap({ tileWidth: 16, tileHeight: 16, width: mapSize, height: mapSize})
    const tile = game.tileMap.addTilesetImage('tile');
    const layer = game.tileMap.createBlankLayer('layer1', tile);
    layer.fill(0,0,0,mapSize,mapSize)
    layer.setScale(1);

    const cursors = game.input.keyboard.createCursorKeys();

    const controlConfig = {
        camera: game.cameras.main,
        left: cursors.left,
        right: cursors.right,
        speed: 0.25
    };

    game.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

    game.cameras.main.setBounds(0, 0, layer.width + 600, 0);
}