import { generateTilemap } from "./tilemap/create.mjs";
import { configureGame, loadAssets } from "./fileManagement/load.mjs";
import { updateControls, setupControls, setupKeyboard,setupUI } from "./input/input.mjs";
import { debugText } from "./ui/debugText.mjs";

class GameScene extends Phaser.Scene{
    constructor()
    {
        super({ key: 'GameScene' });
    }
    graphics;    
    tileMap;   
    currentTileMarker;
    preload ()
    {
        configureGame(this)
        loadAssets(this)
    }
    create ()
    {
        this.graphics = this.add.graphics();
        setupKeyboard(this);
        generateTilemap(this)
        this.input.addPointer(2)
        if (this.frame == 0){
            console.log(this.tileMap)
        }    
        setupControls(this)
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
        this.ui = setupUI(this)
        const gameScene = this.scene.get("GameScene")
        const textStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#888888'};
        this.text = this.add.text(20,20,"",textStyle).setScrollFactor(0);

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
    backgroundColor: "#161616",

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