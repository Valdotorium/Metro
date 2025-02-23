import { Button } from "../input/button.mjs"


let launchGame = function launchGame(game) {
    //temporary, replace with your own logic when you have it
    game.scene.start("GameScene")
    game.scene.stop("StartMenuScene")
}

export function setupStartMenu(game){
    game.startMenuUI = {}
    let textStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#888888'};
    game.startMenuUI.startButton = new Button(game, 550, 400,"START GAME",textStyle, launchGame)
    textStyle = { fontFamily: 'Arial Black', fontSize: 48, color: '#888888'};
    game.startMenuUI.title = game.add.text(200, 100, "INCREDIBLY INNOVATIVE \nTITLE FOR A GAME ABOUT \nBUILDING TRANSPORT SYSTEMS", textStyle);
}