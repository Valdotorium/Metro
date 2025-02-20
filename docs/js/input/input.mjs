import {keyboardControls} from "./keybinds.mjs"
import {dragCamera} from "./mouse.mjs"
import {standardButton} from "./button.mjs"
import {mousewheelzoom} from "./mouse.mjs"
import {touchzoom} from "./mouse.mjs"
import { getHoveredTile,setupCurrentTileMarker} from "./selectTiles.mjs"


let handleClickTest = function handleClickTest(game){
    game.currentTileset++
    if(game.currentTileset >= game.tilesets.length){game.currentTileset = 0}
    const newTileset = game.sys.textures.get(game.tilesets[game.currentTileset].name)
    game.currentTilesetImage.setImage(newTileset)
    //temporary, replace with your own logic when you have it
}
export function setupUI(ui){
    ui.testButton = new standardButton(ui, 200, 300, 30,"SWITCH TILESET", handleClickTest) //temporary
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