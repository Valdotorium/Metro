import { keyboardControls } from "./keybinds.mjs"
import {setupMouse,touchSupport,dragCamera} from "./mouse.mjs"

export function setupControls(game){
    setupMouse(game)
    touchSupport(game)
}

export function updateControls (game) {
    keyboardControls(game)
    dragCamera(game)
}
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