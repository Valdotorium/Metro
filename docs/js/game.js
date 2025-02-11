import { generateTilemap } from "./generate.mjs";
import { configureGame, loadAssets, setupKeyboard } from "./load.mjs";
import { drawTileMap } from "./draw.mjs";
import { updateControls, setupControls } from "./input.mjs";

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
    fps: {
        target: 30 // 30x per second
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
    setupControls(this)
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
    updateControls(this);


    // Update the camera controls based on the arrow keys
    this.controls.update(delta);
    //draw a tilemap
    this.frame++
}