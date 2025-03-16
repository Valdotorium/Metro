import { TextButton } from "../input/TextButton.mjs"
import { loadClientSaveGame } from "../fileManagement/loadSaveGame.mjs"


let launchscene = function launchscene(scene) {
    //temporary, replace with your own logic when you have it
    scene.scene.start("GameScene")
    scene.scene.stop("StartMenuScene")
}

let launchSettings = function launchSettings(scene){
    scene.scene.start("SettingsScene")
    scene.scene.stop("StartMenuScene")
}

let loadSaveGame = async function loadSaveGame(scene){
    scene.options.loadMap = true
    scene.loadedsceneData = await loadClientSaveGame(scene)
    
}

export function setupStartMenu(scene){
    //menu background image
    scene.startMenuUI = {}
    scene.options.loadMap = false
    scene.startMenuUI.startMenuBackground = scene.add.image(0,0, "startMenuBackground").setScale(1.2)
    scene.startMenuUI.startMenuBackground.setOrigin(0,0)
    //start scene TextButton
    let textStyle = { fontFamily: 'Arial Black', fontSize: 40, color: '#888888'};
    scene.startMenuUI.startTextButton = new TextButton(scene, 600, 420,"START GAME",textStyle, launchscene)
    //settings TextButton
    scene.startMenuUI.settingsTextButton = new TextButton(scene, 600, 500,"SETTINGS",textStyle, launchSettings)
    //load save scene TextButton
    scene.startMenuUI.loadSavesceneTextButton = new TextButton(scene, 600, 580,"LOAD SAVE GAME", textStyle, loadSaveGame)
    //scene title with text effects
    textStyle = { fontFamily: 'Arial Black', fontSize: 150, color: '#555555'};
    scene.startMenuUI.title = scene.add.text(297, 97, scene.name, textStyle);
    textStyle = { fontFamily: 'Arial Black', fontSize: 150, color: '#FFFFFF'};
    scene.startMenuUI.title = scene.add.text(303, 103, scene.name, textStyle);
    textStyle = { fontFamily: 'Arial Black', fontSize: 150, color: '#BBBBBB'};
    scene.startMenuUI.title = scene.add.text(300, 100, scene.name, textStyle);

}


export function updateStartMenu(scene){
    //slow circular motion of background image
    scene.startMenuUI.startMenuBackground.setOrigin(0.2+Math.sin(scene.frame * 0.001)/6,0.2+Math.cos(scene.frame * 0.001)/6)
}