export function saveGame(game){
    //save the game data to a JSON string
    //save game.generatedTilemap, game.tileData, game.cities to the jso string
    //return the JSON string
    //log the data first

    console.log(game.generatedTilemap, game.tileData, game.cities)
    return JSON.stringify({
        size: game.generatedTilemap[0].length,
        tileMap: game.generatedTilemap,
        tileData: game.tileData,
        cities: Object.fromEntries(game.cities)
    })

}