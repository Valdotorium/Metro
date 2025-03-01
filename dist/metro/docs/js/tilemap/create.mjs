import { Tilemap } from "../generator/generate.mjs"
import { setupTileData } from "../simulation/setupTileData.mjs"
import { generateCities } from "../simulation/citymanegment.mjs"
export function setupTilemap(game){
    //get the tilemap size

    let mapSize = game.tileMapOptions.size
    console.log(mapSize)
    if (mapSize < 10){ mapSize = 10 }
    if (mapSize > 300){ mapSize = 300 }

    console.log("map size is: ", mapSize)
    //generate a tilemap array with values between 0 and 1
    if (!game.options.loadMap){
        game.generatedTilemap =Tilemap("complex",mapSize)
    } else {
        game.generatedTilemap = game.loadedGameData.tileMap
    }
    //draw a blue rectangle behind the tilemap
    game.add.rectangle(4,4, mapSize * 24, mapSize * 24, 0xb4cee0).setOrigin(0,0).setDepth(-1);

    //switch rows and columns in game.generatedTilemap and store the rotated tilemap in game.RotatedGeneratedTilemap, because phaser stores the rows and colums differently
    let rotatedGeneratedTilemap = game.generatedTilemap.map((row, col) => row.map((tile, index) => game.generatedTilemap[index][col]))
    game.RotatedGeneratedTilemap = rotatedGeneratedTilemap

    //tiles sized 8x8 are placed in a 6x6 grid, allowed to overlap 1 px each side
    game.tileMap = game.make.tilemap({ data: game.RotatedGeneratedTilemap, tileWidth: 6, tileHeight: 6, width: mapSize, height: mapSize}).setLayerTileSize(8,8)
    game.currentTilesetImage = game.tileMap.addTilesetImage(game.tilesets[0].name, game.tilesets[0].name, 8, 8)

    game.currentTileset = 0
    const layer = game.tileMap.createLayer(0, game.tileMap.tilesets[0],0,0);
    layer.setScale(4);
    game.tileMap.layer = layer

    //make tilemap interactive
    game.currentSelectedTile = {x: 0, y: 0}
    game.input.on("pointerdown", function(pointer, gameObject)
    {
        game.currentSelectedTile = game.currentHoveredTile
    })
    //configure the camera
    game.cameras.main.setBounds(-600,-400, layer.width * layer.scale + 1200, layer.height * layer.scale + 800);
    game.cameras.main.zoom = 2

    if (!game.options.loadMap){
        //generating the tileData array (population, etc)
        game.tileData = setupTileData(game)      
    } else {
        game.tileData = game.loadedGameData.tileData
    }
    if (!game.options.loadMap){
        //generating the tileData array (population, etc)
        generateCities(game)      
    } else {
        console.log(game.loadedGameData.cities)
        game.cities =new Map(game.loadedGameData.cities)
    }
}