import { Button } from "../input/button.mjs"
import { Slider } from "../input/slider.mjs"


let quitSettings = function quitSettings(game){
    console.log("I HAVE BEEN CLICKED AT FRAME: ")
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

    game.gameSettingsContents = {} //pack hier die buttons rein
    // game.gameSettingsContents.exampleButton = new Button...
    //buttons to change variables
    const exampleTextStyle = { fontFamily: 'Arial Black', fontSize: 32, color: '#BBBBBB'};
    game.gameSettingsContents.exampleButton = new Button(game, 500,500,"EXAMPLE", exampleTextStyle,quitSettings)
    //add a slider for the map size
    const sliderStyle = { fontFamily: 'Arial Black', fontSize: 32, color: '#BBBBBB'};
    game.gameSettingsContents.sizeSlider = new Slider(game, 200, 600,25,275, "MAP SIZE", sliderStyle, mapSizeSlider)



}