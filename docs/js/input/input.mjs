import {keyboardControls} from "./keybinds.mjs"
import {dragCamera} from "./mouse.mjs"
import {Button} from "./button.mjs"
import {mousewheelzoom} from "./mouse.mjs"
import {touchzoom} from "./mouse.mjs"
import { getHoveredTile,setupCurrentTileMarker} from "./selectTiles.mjs"
import { saveGame } from "../fileManagement/gameDataToJSON.mjs"


let handleClickTest = function handleClickTest(game){
    let gameScene = game.scene.get("GameScene")
    gameScene.currentTileset++
    if(gameScene.currentTileset >= gameScene.tilesets.length){gameScene.currentTileset = 0}
    const newTileset = game.sys.textures.get(gameScene.tilesets[gameScene.currentTileset].name)
    gameScene.currentTilesetImage.setImage(newTileset)
    //temporary, replace with your own logic when you have it
}

let quitGame = function quitGame(game){
    game.scene.stop("GameScene")
    game.scene.stop("GameUIScene")
    game.scene.start("StartMenuScene")
}

let downloadSaveGame = function downloadSaveGame(game){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:json/plain;charset=utf-8,' + saveGame(game.scene.get("GameScene")));
    element.setAttribute('download', "savegame.json");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
export function setupUI(game){
    game.ingameUI = {}
    const textStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#BBBBBB'};
    game.ingameUI.testButton = new Button(game, 1000, 100,"SWITCH TILESET",textStyle, handleClickTest) //temporary
    game.ingameUI.quitButton = new Button(game, 1000, 160,"QUIT GAME",textStyle, quitGame) //temporary
    game.ingameUI.saveButton = new Button(game, 1000, 220,"SAVE GAME", textStyle, downloadSaveGame) //temporary
}
export function setupControls(game){
    mousewheelzoom(game)
    setupKeyboard(game)
    setupCurrentTileMarker(game)
}

export function updateControls (game) {
    keyboardControls(game)
    dragCamera(game)
    game.mouse.worldPoint = game.input.activePointer.positionToCamera(game.cameras.main);
    getHoveredTile(game)
    touchzoom(game)
}

//sets up all the keyboard keybinds that are relevant to the game using keycodes
export function setupKeyboard(game){
    game.keys = new Map()
    //for all keys
    for(let i = 65; i <= 90; i++){
        game.keys.set(String.fromCharCode(i), game.input.keyboard.addKey(i));
    }
    //for number keys
    for(let i = 48; i <= 57; i++){
        game.keys.set(String.fromCharCode(i), game.input.keyboard.addKey(i));
    }
    //for special keys
    game.keys.set("SPACE", game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE));
    game.keys.set("ENTER", game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER));
    game.keys.set("ESC", game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC));
    game.keys.set("SHIFT", game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT));
    game.keys.set("UP", game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP));
    game.keys.set("DOWN", game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN));
    game.keys.set("LEFT", game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT));
    game.keys.set("RIGHT", game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT));
}