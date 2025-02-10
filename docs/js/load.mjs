export function loadAssets(game){
    game.load.image("tile", "assets/images/new_forest.png");

    if(game.options.get("loadMap") == true){
        //load tilemap data from JSON file
        game.load.json("tilemap", "assets/json/world.json");
    }

    //testing loading a tileset
    game.load.image("tileset", "assets/images/tileset.png");



}

export function configureGame(game){
    game.options = new Map()
    game.options.set("loadMap", false)


    game.tileMapOptions = new Map();
    game.tileMapOptions.set("size", 20)

    game.frame = 0

}
