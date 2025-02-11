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
    game.tileMapOptions.set("size", 1000)

    game.frame = 0
    game.zoom = 4

}


export function setupKeyboard(game){
    game.keys = new Map()
    //for all keys
    for(let i = 65; i <= 90; i++){
        game.keys.set(String.fromCharCode(i), game.input.keyboard.addKey(i));
    }
}