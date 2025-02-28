export function saveGame(game){
    //save the game data to a JSON string
    //save game.generatedTilemap, game.tileData, game.cities to the jso string
    //return the JSON string
    //log the data first
    const cityObj = Object.fromEntries(game.cities)
    console.log(game.generatedTilemap, game.tileData)
    var seen = [];
    return JSON.stringify({
        size: game.generatedTilemap[0].length,
        tileMap: game.generatedTilemap,
        tileData: game.tileData,
        cities: cityObj
    },function(key, val) {
        if (val != null && typeof val == "object") {
             if (seen.indexOf(val) >= 0) {
                 return;
             }
             seen.push(val);
         }
         return val;
     })

}