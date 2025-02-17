export function loadAssets(game){
    if(game.options.get("loadMap") == true){
        //load tilemap data from JSON file
        game.load.json("tilemap", "assets/json/world.json");
    }
    //testing loading a tileset
    game.load.image("tileset", "assets/images/newTiles.png");

}

export function configureGame(game){
    game.options = new Map()

    //manually setting game constants
    game.options.set("loadMap", false)
    game.options.set("debug", true)

    game.tileMapOptions = new Map();
    game.tileMapOptions.set("size", 100)

    game.frame = 0
    game.cameras.main.zoom = 2
}


