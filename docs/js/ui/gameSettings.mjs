import { TextButton } from "../input/TextButton.mjs"
import { Slider } from "../input/slider.mjs"


let quitSettings = function quitSettings(scene){
    console.log("I HAVE BEEN CLICKED AT FRAME: ")
    //tryoíng to transfer variables
    scene.scene.get("StartMenuScene").options = scene.options
    scene.scene.get("StartMenuScene").tileMapOptions = scene.tileMapOptions
    scene.scene.stop("SettingsScene")
    scene.scene.start("StartMenuScene")
}

let mapSizeSlider = function mapSizeSlider(scene){
    scene.tileMapOptions.size = scene.sceneSettingsContents.sizeSlider.value
}

export function setupGameSettings(scene){
    scene.options = scene.scene.get("StartMenuScene").options
    scene.tileMapOptions = scene.scene.get("StartMenuScene").tileMapOptions

    scene.sceneSettingsContents = {} //pack hier die TextButtons rein
    // scene.sceneSettingsContents.exampleTextButton = new TextButton...
    //TextButtons to change variables
    const exampleTextStyle = { fontFamily: 'Arial Black', fontSize: 40, color: '#BBBBBB'};
    scene.sceneSettingsContents.exampleTextButton = new TextButton(scene, 600,100,"BACK", exampleTextStyle,quitSettings)
    //slider to adjust mapSize
    const sliderStyle = { fontFamily: 'Arial Black', fontSize: 32, color: '#BBBBBB'};
    scene.sceneSettingsContents.sizeSlider = new Slider(scene, 320, 600,20,200, "MAP SIZE", sliderStyle, mapSizeSlider)



}