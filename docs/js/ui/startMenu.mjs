import { standardButton } from "../input/button.mjs"


let launchGame = function launchGame(game) {
    //temporary, replace with your own logic when you have it
    game.scene.start("GameScene")
    game.scene.stop("StartMenuScene")
}

export function setupStartMenu(game){
    game.startMenuUI = {}

    game.startMenuUI.startButton = new standardButton(game, 550, 400, 64,"START GAME", launchGame)
    const textStyle = { fontFamily: 'Arial Black', fontSize: 48, color: '#888888'};
    game.startMenuUI.title = game.add.text(200, 100, "INCREDIBLY INNOVATIVE \nTITLE FOR A GAME ABOUT \nBUILDING TRANSPORT SYSTEMS", textStyle);
}