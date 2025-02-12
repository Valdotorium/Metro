import { zoomControls, setupCameraControls } from "./keyboard.mjs"
import {setupMouse, dragCamera} from "./mouse.mjs"

export function setupControls(game){
    setupCameraControls(game)
    setupMouse(game)
}

export function updateControls (game) {
    zoomControls(game);
    dragCamera(game);
}
export function setupKeyboard(game){
    game.keys = new Map()
    //for all keys
    for(let i = 65; i <= 90; i++){
        game.keys.set(String.fromCharCode(i), game.input.keyboard.addKey(i));
    }
}