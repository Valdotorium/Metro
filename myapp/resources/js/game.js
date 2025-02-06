import { generateTilemap } from "./generate.mjs";
import { configureGame, loadAssets } from "./load.mjs";
import { drawTileMap } from "./draw.mjs";

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


}

function create ()
{
    generateTilemap(this)
    //display the loaded texture
    this.add.image(400, 300, "tile");
    if (this.frame == 0){
        console.log(this.tileMap)
    }
    drawTileMap(this)
}

function update ()
{

    //draw a tilemap
    this.frame++
    //TODO: #1 draw tilemap constantly adds images, but never removes them
    //drawTileMap(this)
    
    if (this.frame % 10 == 0){
        console.log(this.game.loop.actualFPS)
    }
}