import { generateTilemap } from "./tilemap/create.mjs";
import { configureGame, loadAssets } from "./fileManagement/load.mjs";
import { updateControls, setupControls, setupKeyboard } from "./input/input.mjs";
import { debugText } from "./ui/debugText.mjs";


class GameScene extends Phaser.Scene{
    constructor()
    {
        super({ key: 'GameScene' });
    }
    preload ()
    {
        configureGame(this)
        loadAssets(this)

    }

    create ()
    {
        setupKeyboard(this);
        generateTilemap(this)
        setupControls(this)
        if (this.frame == 0){
            console.log(this.tileMap)
        }    

    }

    update ()
    {

        //get current window dimensions
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        //  Update the controls
        updateControls(this);

        //draw a tilemap
        this.frame++

        if (this.frame == 1){
            this.scene.launch('UIScene');
        }
    }
}

class UIScene extends Phaser.Scene{
    constructor()
    {
        super({ key: 'UIScene'});
    }
    create(){

        const gameScene = this.scene.get("GameScene")
        this.text = this.add.text(20,20).setText('Click to move').setScrollFactor(0);
    }
    update(){
        
        const gameScene = this.scene.get("GameScene")
        if (gameScene.options.get("debug")){
            debugText(this)
        }



    }


}

var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    inputTouch: true,

    scene: [GameScene, UIScene],
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