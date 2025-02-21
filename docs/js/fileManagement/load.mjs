export function loadAssets(game){
    if(game.options.get("loadMap") == true){
        //load tilemap data from JSON file
        game.load.json("tilemap", "assets/json/world.json");
    }
    game.tilesets = []
    //testing loading a tileset
    game.tilesets.push({name: "MapTileset", image: game.load.image("MapTileset", "assets/images/mapTiles.png") })
    game.tilesets.push({name: "SatelliteTileset", image: game.load.image("SatelliteTileset", "assets/images/reallyNewTilesExtruded.png") })
    game.tilesets.push({name: "HybridTileset", image: game.load.image("HybridTileset", "assets/images/hybridMapTiles.png") })


}

export function configureGame(game){
    game.options = new Map()

    //manually setting game constants
    game.options.set("loadMap", false)
    game.options.set("debug", true)

    game.tileMapOptions = new Map();
    //future ops: tiny: 25, small: 40, default: 75, large: 150, giant: 250
    game.tileMapOptions.set("size", 75)

    game.frame = 0
    game.cameras.main.zoom = 2
}


