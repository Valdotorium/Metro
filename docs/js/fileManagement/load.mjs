export function loadAssets(game){
    if(game.options.get("loadMap") == true){
        //load tilemap data from JSON file
        game.load.json("tilemap", "assets/json/world.json");
    }
    //testing loading a tileset
    game.load.image("tileset", "assets/images/reallyNewTiles.png");

}

export function configureGame(game){
    game.options = new Map()

    //manually setting game constants
    game.options.set("loadMap", false)
    game.options.set("debug", true)

    game.tileMapOptions = new Map();
    //future ops: tiny: 25, small: 40, default: 75, large: 150, giant: 250
    game.tileMapOptions.set("size", 250)

    game.frame = 0
    game.cameras.main.zoom = 2
}


