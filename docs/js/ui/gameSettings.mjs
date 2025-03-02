import { TextButton } from "../input/TextButton.mjs"
import { Slider } from "../input/slider.mjs"


let quitSettings = function quitSettings(game){
    console.log("I HAVE BEEN CLICKED AT FRAME: ")
    //tryoíng to transfer variables
    game.scene.get("StartMenuScene").options = game.options
    game.scene.get("StartMenuScene").tileMapOptions = game.tileMapOptions
    game.scene.stop("SettingsScene")
    game.scene.start("StartMenuScene")
}

let mapSizeSlider = function mapSizeSlider(game){
    game.tileMapOptions.size = game.gameSettingsContents.sizeSlider.value
}

export function setupGameSettings(game){
    game.options = game.scene.get("StartMenuScene").options
    game.tileMapOptions = game.scene.get("StartMenuScene").tileMapOptions

    game.gameSettingsContents = {} //pack hier die TextButtons rein
    // game.gameSettingsContents.exampleTextButton = new TextButton...
    //TextButtons to change variables
    const exampleTextStyle = { fontFamily: 'Arial Black', fontSize: 40, color: '#BBBBBB'};
    game.gameSettingsContents.exampleTextButton = new TextButton(game, 600,100,"BACK", exampleTextStyle,quitSettings)
    //slider to adjust mapSize
    const sliderStyle = { fontFamily: 'Arial Black', fontSize: 32, color: '#BBBBBB'};
    game.gameSettingsContents.sizeSlider = new Slider(game, 320, 600,20,200, "MAP SIZE", sliderStyle, mapSizeSlider)



}