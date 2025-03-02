import { initializeDesktopApp } from "./initializeNeutralino.mjs"

//runs when the GAME SCENE loaded
export function loadAssets(game){
    game.tilesets = []
    //testing loading a tileset
    game.tilesets.push({name: "SatelliteTileset", image: game.load.image("SatelliteTileset", "assets/images/reallyNewTilesExtruded.png")})
    game.tilesets.push({name: "MapTileset", image: game.load.image("MapTileset", "assets/images/mapTiles.png")})
    game.tilesets.push({name: "HybridTileset", image: game.load.image("HybridTileset", "assets/images/hybridMapTiles.png")})
    game.tilesets.push({name: "DarkTileset", image: game.load.image("DarkTileset", "assets/images/darkTiles.png")})

    game.load.image("ForwardIcon", "assets/images/icons/forward.png")
    game.load.image("BackwardIcon", "assets/images/icons/backward.png")
    game.load.image("ClockIcon", "assets/images/icons/clock.png")


    console.log("loaded assets!")
}
//runs when the game opens
export function configureGame(game){

    game.options = {}
    //manually setting game constants
    game.options.loadMap = false
    game.options.debug = true

    game.tileMapOptions = {}
    game.tileMapOptions.size = 85

    game.frame = 0

    initializeDesktopApp(game)
}

export function loadStartMenuAssets(game){
    game.name = "METRO"
    //load assets for the start menu
    game.load.image("startMenuBackground", "assets/images/startScreen.png")

}

