import { generateTilemap } from "./generate.mjs";
import { configureGame, loadAssets, setupKeyboard } from "./load.mjs";
import { drawTileMap } from "./draw.mjs";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
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
    setupKeyboard(this);
    generateTilemap(this)
    if (this.frame == 0){
        console.log(this.tileMap)
    }
    drawTileMap(this)

}

function update (time, delta)
{
    // Update the controls
    //zoom in or out if a or d are pressed
    if (this.keys.get("A").isDown && this.cameras.main.zoom < 8) {
        this.cameras.main.zoom += 0.01;
    }
    if (this.keys.get("D").isDown && this.cameras.main.zoom > 0.5) {
        this.cameras.main.zoom -= 0.01;
    }
    // Update the camera controls based on the arrow keys
    this.controls.update(delta);
    //draw a tilemap
    this.frame++
    //TODO: #1 draw tilemap constantly adds images, but never removes them
    //drawTileMap(this)
    
    if (this.frame % 10 == 0){
        console.log(this.game.loop.actualFPS)
    }
}