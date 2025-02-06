import { generateTilemap } from "./generate.mjs";
import { configureGame, loadAssets } from "./load.mjs";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    configureGame(this)
    loadAssets(this)
    generateTilemap(this)

}

function create ()
{
    //display the loaded texture
    this.add.image(400, 300, "tile");
}

function update ()
{
    if (this.frame == 0){
        console.log(this.tileMap)
    }
    //draw a tilemap
    this.frame++
}