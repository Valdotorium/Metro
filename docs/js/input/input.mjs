import { zoomControls, setupCameraControls } from "./keyboard.mjs"


export function setupControls(game){
    setupCameraControls(game)
}

export function updateControls (game) {
    zoomControls(game);
}
export function setupKeyboard(game){
    game.keys = new Map()
    //for all keys
    for(let i = 65; i <= 90; i++){
        game.keys.set(String.fromCharCode(i), game.input.keyboard.addKey(i));
    }
}