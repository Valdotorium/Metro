import { generateTilemap } from "./generate.mjs";
import { configureGame, loadAssets, setupKeyboard } from "./load.mjs";
import { drawTileMap } from "./draw.mjs";

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
      },
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

    //get current window dimensions
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    console.log(this.windowWidth, this.windowHeight)

    //  Update the controls
    //zoom in or out if a or d are pressed
    if (this.keys.get("A").isDown && this.cameras.main.zoom < 5) {
        this.cameras.main.zoom += 0.01;
    }
    if (this.keys.get("D").isDown && this.cameras.main.zoom > 0.3) {
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
        this.controls.speed = 2/this.tileMap.layer.scale 
    }
}