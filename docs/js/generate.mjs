export function generateTilemap(game){
    //get the tilemap size
    const mapSize = game.tileMapOptions.get("size")

    console.log("map size is: ", mapSize)

    game.tileMap = game.make.tilemap({ tileWidth: 16, tileHeight: 16, width: mapSize, height: mapSize})
    const tile = game.tileMap.addTilesetImage('tile');
    const layer = game.tileMap.createBlankLayer('layer1', tile);
    layer.fill(0,0,0,mapSize,mapSize)
    layer.setScale(1);
}