export function setPopulationTileMap(scene){
    let game = scene.scene.get("GameScene")
    //render population tilemap
    //make normal tilemap temporarily invisible
    game.simulation.speed = 0
    game.realTileMap = game.tileMap.layer
    console.log(game.tileMap.layer)
    //scene.tileMap = scene.make.tilemap({ data: scene.RotatedStatisticalTilemap, tileWidth: 1, tileHeight: 1, width: mapSize, height: mapSize}).setLayerTileSize(8,8)

}