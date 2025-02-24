//runs when the GAME SCENE loaded
export function loadAssets(game){
    if(game.options.loadMap == true){
        //load tilemap data from JSON file
        game.load.json("tilemap", "assets/json/world.json");
    }
    game.tilesets = []
    //testing loading a tileset
    game.tilesets.push({name: "MapTileset", image: game.load.image("MapTileset", "assets/images/mapTiles.png")})
    game.tilesets.push({name: "SatelliteTileset", image: game.load.image("SatelliteTileset", "assets/images/reallyNewTilesExtruded.png")})
    game.tilesets.push({name: "HybridTileset", image: game.load.image("HybridTileset", "assets/images/hybridMapTiles.png")})

    console.log("loaded assets!")
}


//runs when the game opens
export function configureGame(game){

    game.options = {}
    //manually setting game constants
    game.options.loadMap = false
    game.options.debug = true

    game.tileMapOptions = {}
    //future ops: tiny: 25, small: 50, default: 85, large: 175, giant: 300
    game.tileMapOptions.size = 85

    game.frame = 0
}

export function loadStartMenuAssets(game){
    game.name = "METRO"
    //load assets for the start menu
    game.load.image("startMenuBackground", "assets/images/startScreen.png")

}

