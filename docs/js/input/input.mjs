import {keyboardControls} from "./keybinds.mjs"
import {dragCamera} from "./mouse.mjs"
import {TextButton} from "./TextButton.mjs"
import {mousewheelzoom} from "./mouse.mjs"
import {touchzoom} from "./mouse.mjs"
import { getHoveredTile,setupCurrentTileMarker} from "./selectTiles.mjs"
import { downloadFileWeb, saveFileDesktop } from "../fileManagement/downloadFile.mjs"
import { ImageButton } from "./ImageButton.mjs"
import { setPopulationTileMap } from "../tilemap/statisticalTileMap.mjs"

let populationMap = function populationMap(scene){
    setPopulationTileMap(scene)
}

function updateTimeText(scene){
    let gameScene = scene.scene.get("GameScene")
    scene.inGameUI.timeText.setText(`Time: ${gameScene.simulation.time.year}-${gameScene.simulation.time.month}-${gameScene.simulation.time.day} ${gameScene.simulation.time.hour}:${Math.round(gameScene.simulation.time.minute)}`)

}
let handleClickTest = function handleClickTest(scene){
    let gameScene = scene.scene.get("GameScene")
    gameScene.currentTileset++
    if(gameScene.currentTileset >= gameScene.tilesets.length){gameScene.currentTileset = 0}
    const newTileset = scene.sys.textures.get(gameScene.tilesets[gameScene.currentTileset].name)
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
    scene = scene.scene.get("GameScene")

    if (scene.simulation.speed < 4){
        scene.simulation.speed *= 2
    }
}
let slowDown = function slowDown(scene){
    scene = scene.scene.get("GameScene")
    if (scene.simulation.speed > 0.5){
        scene.simulation.speed /= 2
    }
}
export function setupUI(scene){
    scene.inGameUI = {}
    let textStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#BBBBBB'};
    //the buttons
    scene.inGameUI.testTextButton = new TextButton(scene, 1000, 160,"SWITCH TILESET",textStyle, handleClickTest) //temporary
    scene.inGameUI.quitTextButton = new TextButton(scene, 1000, 220,"QUIT GAME",textStyle, quitGame) //temporary
    scene.inGameUI.saveTextButton = new TextButton(scene, 1000, 280,"SAVE GAME", textStyle, downloadSavescene) //temporary
    scene.inGameUI.forwardButton = new ImageButton(scene, 1100,50, "ForwardIcon", 90, 70, speedUp)
    scene.inGameUI.backwardButton = new ImageButton(scene, 880,50, "BackwardIcon", 90, 70, slowDown)
    scene.inGameUI.populationMapButton = new TextButton(scene, 1000,340, "POP. MAP", textStyle, populationMap) //temporary
    scene.add.image(990, 50, "ClockIcon").setScale(0.6,0.6)
    //text displaying current time
    let gameScene = scene.scene.get("GameScene")
    textStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#444444'};
    scene.inGameUI.timeText = scene.add.text(840, 90, gameScene.simulation.time.year + "/" + gameScene.simulation.time.month + "/" + gameScene.simulation.time.day + " - " + gameScene.simulation.time.hour + ":" + gameScene.simulation.time.minute, textStyle)

}
export function setupControls(scene){
    mousewheelzoom(scene)
    setupKeyboard(scene)
    setupCurrentTileMarker(scene)
}

export function updateControls (scene) {
    keyboardControls(scene)
    dragCamera(scene)
    scene.mouse.worldPoint = scene.input.activePointer.positionToCamera(scene.cameras.main);
    getHoveredTile(scene)
    touchzoom(scene)
}

export function updateUI(scene){
    updateTimeText(scene)
}

//sets up all the keyboard keybinds that are relevant to the scene using keycodes
export function setupKeyboard(scene){
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