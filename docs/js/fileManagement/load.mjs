import { initializeDesktopApp } from "./initializeNeutralino.mjs"

//runs when the game SCENE loaded
export function loadAssets(scene){
    //loading all game scene assets
    
    scene.tilesets = []
    scene.statisticalTilesets = []
    scene.statisticalTilemapIsEnabled = false
    //testing loading a tileset
    scene.tilesets.push({name: "SatelliteTileset", image: scene.load.image("SatelliteTileset", "assets/images/reallyNewTilesExtruded.png")})
    scene.tilesets.push({name: "MapTileset", image: scene.load.image("MapTileset", "assets/images/mapTiles.png")})
    //scene.tilesets.push({name: "HybridTileset", image: scene.load.image("HybridTileset", "assets/images/hybridMapTiles.png")})
    scene.tilesets.push({name: "DarkTileset", image: scene.load.image("DarkTileset", "assets/images/darkTiles.png")})

    scene.statisticalTilesets.push({name: "PopulationTileset", image: scene.load.image("PopulationTileset", "assets/images/gradientTiles.png")})

    scene.load.image("ForwardIcon", "assets/images/icons/forward.png")
    scene.load.image("BackwardIcon", "assets/images/icons/backward.png")
    scene.load.image("ClockIcon", "assets/images/icons/clock.png")


    console.log("loaded assets!")
}
//runs when the scene opens
export function configureGame(scene){

    scene.options = {}
    //manually setting scene constants
    scene.options.loadMap = false
    scene.options.debug = true

    scene.tileMapOptions = {}
    scene.tileMapOptions.size = 85

    scene.frame = 0

    initializeDesktopApp(scene)
}

export function loadStartMenuAssets(scene){
    scene.name = "METRO"
    //load assets for the start menu
    scene.load.image("startMenuBackground", "assets/images/startScreen.png")

}

