function generateTilemapArray(mapSize){
    //generate a tilemap array with widt mapSize and height mapSize
    const tilemapArray = Array.from({length: mapSize}, () => Array.from({length: mapSize}, () => 0));

    //fill the array with random numbers between 0 and 15
    for(let i = 0; i < mapSize; i++){
        for(let j = 0; j < mapSize; j++){
            tilemapArray[i][j] = Math.floor(Math.random() * 15);
        }
    }
    return tilemapArray;
}

export function generateTilemap(game){
    //get the tilemap size
    const mapSize = game.tileMapOptions.get("size")

    console.log("map size is: ", mapSize)
    //generate a tilemap array
    game.generatedTilemap = generateTilemapArray(mapSize)
    
    game.tileMap = game.make.tilemap({ data: game.generatedTilemap, tileWidth: 6, tileHeight: 6, width: mapSize, height: mapSize}).setLayerTileSize(8,8)
    let tileset = game.tileMap.addTilesetImage('tileset', null, 8,8);
    //create a tilemap layer with the generated tilemap array and the tileset, and place it at (100,100) on the screen, with a scale of 4
    const layer = game.tileMap.createLayer(0, tileset,100,100);
    layer.setScale(4);
    game.cameras.main.setBounds(0,0, layer.width * layer.scale + 200, layer.height * layer.scale + 200);

}