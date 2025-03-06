import { switchTileMapData } from "./switchTileData.mjs"
export function setPopulationTileMap(scene){
    let game = scene.scene.get("GameScene")
    //generate population density map
    let mapSize = game.tileMapOptions.size
    let statisticalTilemap = []
    for(let i = 0; i < mapSize; i++){
        statisticalTilemap[i] = []
        for(let j = 0; j < mapSize; j++){
            statisticalTilemap[i][j] = Phaser.Math.Clamp(Math.round(game.tileData[i][j].population), 0,24)
        }
    }
    game.currentTilesetImage.tileWidth = 1
    game.currentTilesetImage.tileHeight = 1
    let ts = scene.sys.textures.get("PopulationTileset")
    game.currentTilesetImage.setImage(ts)
    //change the tilemap data
    switchTileMapData(game.tileMap, statisticalTilemap)

    game.simulation.speed = 0
    game.statisticalTilemapIsEnabled = true
}
export function setNormalTilemap(scene){
    let game = scene.scene.get("GameScene")
    game.currentTilesetImage.tileWidth = 8
    game.currentTilesetImage.tileHeight = 8
    let ts = scene.sys.textures.get("SatelliteTileset")
    game.currentTilesetImage.setImage(ts)
    //change the tilemap data
    switchTileMapData(game.tileMap, game.generatedTilemap)

    game.simulation.speed = 1
    game.statisticalTilemapIsEnabled = false
    game.currentTileset = 0
}