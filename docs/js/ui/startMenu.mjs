import { TextButton } from "../input/TextButton.mjs"
import { loadClientSaveGame } from "../fileManagement/loadSaveGame.mjs"


let launchGame = function launchGame(game) {
    //temporary, replace with your own logic when you have it
    game.scene.start("GameScene")
    game.scene.stop("StartMenuScene")
}

let launchSettings = function launchSettings(game){
    game.scene.start("SettingsScene")
    game.scene.stop("StartMenuScene")
}

let loadSaveGame = async function loadSaveGame(game){
    game.options.loadMap = true
    game.loadedGameData = await loadClientSaveGame(game)
    
}

export function setupStartMenu(game){
    //menu background image
    game.startMenuUI = {}
    game.options.loadMap = false
    game.startMenuUI.startMenuBackground = game.add.image(0,0, "startMenuBackground").setScale(1.2)
    game.startMenuUI.startMenuBackground.setOrigin(0,0)
    //start game TextButton
    let textStyle = { fontFamily: 'Arial Black', fontSize: 40, color: '#888888'};
    game.startMenuUI.startTextButton = new TextButton(game, 600, 420,"START GAME",textStyle, launchGame)
    //settings TextButton
    game.startMenuUI.settingsTextButton = new TextButton(game, 600, 500,"SETTINGS",textStyle, launchSettings)
    //load save game TextButton
    game.startMenuUI.loadSaveGameTextButton = new TextButton(game, 600, 580,"LOAD SAVE GAME", textStyle, loadSaveGame)
    //game title with text effects
    textStyle = { fontFamily: 'Arial Black', fontSize: 150, color: '#555555'};
    game.startMenuUI.title = game.add.text(297, 97, game.name, textStyle);
    textStyle = { fontFamily: 'Arial Black', fontSize: 150, color: '#FFFFFF'};
    game.startMenuUI.title = game.add.text(303, 103, game.name, textStyle);
    textStyle = { fontFamily: 'Arial Black', fontSize: 150, color: '#BBBBBB'};
    game.startMenuUI.title = game.add.text(300, 100, game.name, textStyle);

}


export function updateStartMenu(game){
    //slow circular motion of background image
    game.startMenuUI.startMenuBackground.setOrigin(0.2+Math.sin(game.frame * 0.001)/6,0.2+Math.cos(game.frame * 0.001)/6)
}