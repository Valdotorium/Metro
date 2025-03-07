import {keyboardControls} from "./keybinds.mjs"
import {dragCamera, updateMouse} from "./mouse.mjs"
import {TextButton} from "./TextButton.mjs"
import {Checkbox} from "./Checkbox.mjs"
import {mousewheelzoom} from "./mouse.mjs"
import {touchzoom} from "./mouse.mjs"
import { getHoveredTile,setupCurrentTileMarker} from "./selectTiles.mjs"
import { downloadFileWeb, saveFileDesktop } from "../fileManagement/downloadFile.mjs"
import { ImageButton } from "./ImageButton.mjs"
import { setPopulationTileMap, setNormalTilemap } from "../tilemap/statisticalTileMap.mjs"
import { railwayLineConstruction } from "./railwayConstruction.mjs"
import {Listselector} from "./Listselector.mjs"



//CALLBACK FUNCTION SECTION
let populationMap = function populationMap(scene){
    if ( scene.inGameUI.populationMapButton.state == false){
        setNormalTilemap(scene)
    }else{
        setPopulationTileMap(scene)
    }
}

let handleClickTest = function handleClickTest(scene, index){
    let gameScene = scene.scene.get("GameScene")
    const newTileset = scene.sys.textures.get(gameScene.tilesets[index].name)
    gameScene.currentTilesetImage.setImage(newTileset)
        //temporary, replace with your own logic when you have i
}

let quitGame = function quitGame(scene){
    scene.options.loadMap = false
    scene.scene.stop("GameScene")
    scene.scene.stop("GameUIScene")
    scene.scene.start("StartMenuScene")
}

let downloadSavescene = function downloadSavescene(scene){
    if (!scene.options.isDesktopBuild) {
        downloadFileWeb(scene)
    } else {
        saveFileDesktop(scene)
    }
    
}

let speedUp = function speedUp(scene){
    let game = scene.scene.get("GameScene")

    if (game.simulation.speed < 16){
        game.simulation.speed *= 2
        scene.inGameUI.backwardButton.text.setAlpha(1)
        if(game.simulation.speed == 16){
            scene.inGameUI.forwardButton.text.setAlpha(0.5)
        }
    }
    if (game.simulation.speed == 0.0){
        game.simulation.speed = 0.5
        scene.inGameUI.clockIcon.setAlpha(1)
    }
}
let slowDown = function slowDown(scene){
    let game = scene.scene.get("GameScene")
    if (game.simulation.speed == 0.5){
        game.simulation.speed = 0.0
        scene.inGameUI.clockIcon.setAlpha(0.5)
    }
    if (game.simulation.speed > 0.5){
        scene.inGameUI.forwardButton.text.setAlpha(1)
        game.simulation.speed /= 2
        if(game.simulation.speed == 0.5){
            scene.inGameUI.backwardButton.text.setAlpha(0.5)
        }
    }
    
}

let setConstructionTool = function setConstructionTool(scene, state){
    let tools = ["NONE", "STATION", "RAILWAYS"]
    scene.inGameUI.currentActiveTool = tools[state]
}

//CALLBACK FUNCTION SECTION END

// DEFINING THE INGAME UI AND GAME CONTROLS
//NOTE: game UI is in the GameUIScene, controls in the GameScene
export function setupUI(scene){
    let gameScene = scene.scene.get("GameScene")
    scene.inGameUI = {}
    scene.inGameUI.currentActiveTool = "none"
    let textStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#BBBBBB'};
    //the buttons
    var tilesetnames = [];
    for (var i=0; i < gameScene.tilesets.length ; ++i)
        tilesetnames.push(gameScene.tilesets[i]["name"]);
    scene.inGameUI.testTextButton = new Listselector(scene, 1000, 220,"SWITCH TILESET",textStyle, handleClickTest, tilesetnames, 0) //temporary
    scene.inGameUI.quitTextButton = new TextButton(scene, 1000, 280,"QUIT GAME",textStyle, quitGame) //temporary
    scene.inGameUI.saveTextButton = new TextButton(scene, 1000, 340,"SAVE GAME", textStyle, downloadSavescene) //temporary
    scene.inGameUI.forwardButton = new ImageButton(scene, 1100,50, "ForwardIcon", 90, 70, speedUp)
    scene.inGameUI.backwardButton = new ImageButton(scene, 880,50, "BackwardIcon", 90, 70, slowDown)
    scene.inGameUI.populationMapButton = new Checkbox(scene, 1000,400, "POP. MAP", textStyle, populationMap, false) //temporary
    scene.inGameUI.toolSelector = new Listselector(scene, 1000, 500, "TOOL", textStyle, setConstructionTool, ["NONE", "STATION", "RAILWAYS"],0) //temporary
    scene.inGameUI.clockIcon = scene.add.image(990, 50, "ClockIcon").setScale(0.6,0.6)
    //text displaying current time
    textStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#444444'};
    scene.inGameUI.timeText = scene.add.text(840, 90, gameScene.simulation.time.year + "/" + gameScene.simulation.time.month + "/" + gameScene.simulation.time.day + " - " + gameScene.simulation.time.hour + ":" + gameScene.simulation.time.minute, textStyle)

}
export function setupControls(scene){
    mousewheelzoom(scene)
    setupKeyboard(scene)
    setupCurrentTileMarker(scene)
    scene.mouse = {}
    scene.mouse.wasDown = false
}
 
//UPDATING GAME UI AND CONTROLS
export function updateControls (scene) {
    //this fuction is called from the GAME scene
    if(scene.frame>3){
        let UIscene = scene.scene.get("GameUIScene")
        updateMouse(scene)
        keyboardControls(scene)
        if (UIscene.inGameUI.currentActiveTool== "NONE"){
            dragCamera(scene)
        } else if (UIscene.inGameUI.currentActiveTool == "STATION"){
            railwayLineConstruction(scene)
        }
        scene.mouse.worldPoint = scene.input.activePointer.positionToCamera(scene.cameras.main);
        getHoveredTile(scene)
        touchzoom(scene)
    } else{
        //if getting UIscene.inGameUI.currentActiveTool fails
        updateMouse(scene)
        keyboardControls(scene)
        dragCamera(scene)
        scene.mouse.worldPoint = scene.input.activePointer.positionToCamera(scene.cameras.main);
        getHoveredTile(scene)
        touchzoom(scene)
    }

}


function updateTimeText(scene){
    let gameScene = scene.scene.get("GameScene")
    scene.inGameUI.timeText.setText(`Time: ${gameScene.simulation.time.year}-${gameScene.simulation.time.month}-${gameScene.simulation.time.day} ${gameScene.simulation.time.hour}:${Math.round(gameScene.simulation.time.minute)}`)

}

export function updateUI(scene){
    updateTimeText(scene)
}

//sets up all the keyboard keybinds that are relevant to the scene using keycodes
export function setupKeyboard(scene){
    //this fuction is called from the GAME scene
    scene.keys = new Map()
    //for all keys
    for(let i = 65; i <= 90; i++){
        scene.keys.set(String.fromCharCode(i), scene.input.keyboard.addKey(i));
    }
    //for number keys
    for(let i = 48; i <= 57; i++){
        scene.keys.set(String.fromCharCode(i), scene.input.keyboard.addKey(i));
    }
    //for special keys
    scene.keys.set("SPACE", scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE));
    scene.keys.set("ENTER", scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER));
    scene.keys.set("ESC", scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC));
    scene.keys.set("SHIFT", scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT));
    scene.keys.set("UP", scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP));
    scene.keys.set("DOWN", scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN));
    scene.keys.set("LEFT", scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT));
    scene.keys.set("RIGHT", scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT));
}