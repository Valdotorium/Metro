import { Button } from "../input/button.mjs"


let launchGame = function launchGame(game) {
    //temporary, replace with your own logic when you have it
    game.scene.start("GameScene")
    game.scene.stop("StartMenuScene")
}

export function setupStartMenu(game){
    //add a 4x upscaled version of the startMenuBackground image
    game.startMenuUI = {}
    game.startMenuUI.startMenuBackground = game.add.image(0,0, "startMenuBackground").setScale(1.2)
    game.startMenuUI.startMenuBackground.setOrigin(0,0)
    let textStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#888888'};
    game.startMenuUI.startButton = new Button(game, 550, 400,"START GAME",textStyle, launchGame)
    textStyle = { fontFamily: 'Arial Black', fontSize: 48, color: '#000000'};
    game.startMenuUI.title = game.add.text(250, 100, "INCREDIBLY INNOVATIVE \nTITLE FOR A GAME ABOUT \nBUILDING TRANSPORT SYSTEMS", textStyle);
}


export function updateStartMenu(game){
    game.startMenuUI.startMenuBackground.setOrigin(0.2+Math.sin(game.frame * 0.001)/6,0.2+Math.cos(game.frame * 0.001)/6)
}