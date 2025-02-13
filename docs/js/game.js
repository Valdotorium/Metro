import { generateTilemap } from "./tilemap/create.mjs";
import { configureGame, loadAssets } from "./fileManagement/load.mjs";
import { updateControls, setupControls, setupKeyboard } from "./input/input.mjs";

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    inputTouch: true,

    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1200,
        height: 800,
        expandParent: true,
        resizeInterval: 50,
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
    this.text = this.add.text(20,20).setText('Click to move').setScrollFactor(0);
}

function update (time, delta)
{

    //get current window dimensions
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.text.setText([
        `mouseX: ${this.mouse.x}`,
        `mouseY: ${this.mouse.y}`,
        `duration: ${this.mouse.getDuration()}`,
        `window Dimensions: ${this.windowWidth, this.windowHeight}`,
        `zoom: ${this.cameras.main.zoom}`
    ])

    //  Update the controls
    updateControls(this);

    // Update the camera controls based on the arrow keys
    this.controls.update(delta);
    //draw a tilemap
    this.frame++
}