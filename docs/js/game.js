import { setupTilemaps } from "./tilemap/create.mjs";
import { configureGame, loadAssets, loadStartMenuAssets } from "./fileManagement/load.mjs";
import { updateControls, setupControls, setupKeyboard,setupUI, updateUI } from "./input/input.mjs";
import { debugText } from "./ui/debugText.mjs";
import { setupStartMenu, updateStartMenu} from "./ui/startMenu.mjs";
import { setupGameSettings } from "./ui/gameSettings.mjs";
import { CityGrowth } from "./simulation/citymanegment.mjs";
import { setupSimulation, simulate } from "./simulation/simulation.mjs";

class GameScene extends Phaser.Scene{
    constructor()
    {
        super({ key: 'GameScene' , active: false});
    }
    preload ()
    {
        //load options
        this.options = this.scene.get("StartMenuScene").options
        this.tileMapOptions = this.scene.get("StartMenuScene").tileMapOptions
        loadAssets(this)
    }
    create ()
    {
        //setting up the game
        this.graphics = this.add.graphics();
        setupTilemaps(this)
        setupSimulation(this)
        this.frame = 0
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

        //draw a tilemap
        this.frame++

        if (this.frame == 1){
            this.scene.launch('GameUIScene');
        }
        //  Update the controls and simulation
        updateControls(this);
        simulate(this)
    }
}
class GameUIScene extends Phaser.Scene{
    constructor()
    {
        super({ key: 'GameUIScene', active: false});
    }
    create(){
        //load options
        this.options = this.scene.get("StartMenuScene").options
        this.tileMapOptions = this.scene.get("StartMenuScene").tileMapOptions
        setupUI(this)
        //the debug text object
        if(this.options.debug ){
            const textStyle = { fontFamily: 'Arial Black', fontSize: 24, color: '#444444'};
            this.text = this.add.text(20,20,"",textStyle).setScrollFactor(0);
        }
    }
    update(){
        updateUI(this)     
        if (this.options.debug){
            debugText(this)
        }
    }
}
class SettingsScene extends Phaser.Scene {
    constructor(){
        super({ key: 'SettingsScene', active: false});
    }
    preload(){
    }
    create(){
        this.frame = 0
        setupKeyboard(this);
        console.log(game.options)
        this.scene.stop("GameScene")
        setupGameSettings(this)
    }
    update(){
        this.frame++
    }
}
class StartMenuScene extends Phaser.Scene {
    constructor(){
        super({ key: 'StartMenuScene', active: true});
    }
    preload(){
        loadStartMenuAssets(this)
    }
    create(){
        this.frame = 0
        setupKeyboard(this);
        console.log(this.options)
        this.scene.stop("GameScene")
        setupStartMenu(this)

    }
    update(){
        updateStartMenu(this)
        this.frame++
    }
}
class BootScene extends Phaser.Scene {
    constructor(){
        super({ key: 'FirstBoot', active: true});
    }
    preload(){
        configureGame(this)
        //transfer options and tileMapOptions to StartMenuScene
        this.scene.get("StartMenuScene").options = this.options
        this.scene.get("StartMenuScene").tileMapOptions = this.tileMapOptions
    }

}
var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    inputTouch: true,
    backgroundColor: "#161616",
    powerPreference:"high-performance",

    scene: [BootScene, StartMenuScene, GameScene, GameUIScene, SettingsScene],
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