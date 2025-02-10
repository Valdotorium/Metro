export function generateTilemap(game){
    //get the tilemap size
    const mapSize = game.tileMapOptions.get("size")

    console.log("map size is: ", mapSize)

    game.tileMap = game.make.tilemap({ tileWidth: 8, tileHeight: 8, width: mapSize, height: mapSize})
    const tileset = game.tileMap.addTilesetImage('tileset');
    const layer = game.tileMap.createBlankLayer('layer1', tileset,0,0);
    layer.fill(1,0,0,mapSize,mapSize)
    layer.setScale(4);

    const cursors = game.input.keyboard.createCursorKeys();

    const controlConfig = {
        camera: game.cameras.main,
        left: cursors.left,
        right: cursors.right,
        speed: 0.25
    };

    game.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

    game.cameras.main.setBounds(0, 0, layer.width + 1000, 600);
}