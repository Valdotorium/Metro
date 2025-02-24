import { Button } from "../input/button.mjs"


let quitSettings = function quitSettings(game){
    console.log("I HAVE BEEN CLICKED AT FRAME: ")
    game.scene.get("StartMenuScene").options = game.options
    game.scene.get("StartMenuScene").tileMapOptions = game.tileMapOptions
    game.scene.stop("SettingsScene")
    game.scene.start("StartMenuScene")
}

let changeTileMapSizeTo25 = function changeTileMapSizeTo25(game){
    game.tileMapOptions.size = 25
}

export function setupGameSettings(game){
    game.options = game.scene.get("StartMenuScene").options
    game.tileMapOptions = game.scene.get("StartMenuScene").tileMapOptions

    game.gameSettingsContents = {} //pack hier die buttons rein
    // game.gameSettingsContents.exampleButton = new Button...
    //buttons to change variables
    const exampleTextStyle = { fontFamily: 'Arial Black', fontSize: 28, color: '#888888'};
    game.gameSettingsContents.exampleButton = new Button(game, 500,500,"EXAMPLE", exampleTextStyle,quitSettings)
    //button that sets game.tileMapOptions.size to 25
    game.gameSettingsContents.size25Button = new Button(game, 500,550,"SIZE 25", exampleTextStyle, changeTileMapSizeTo25)

}