import { TextButton } from "../input/TextButton.mjs"
import { Slider } from "../input/slider.mjs"
import { Checkbox } from "../input/Checkbox.mjs"


let quitSettings = function quitSettings(scene){
    console.log("I HAVE BEEN CLICKED AT FRAME: ")
    //tryoíng to transfer variables
    scene.scene.get("StartMenuScene").options = scene.options
    scene.scene.get("StartMenuScene").tileMapOptions = scene.tileMapOptions
    scene.scene.stop("SettingsScene")
    scene.scene.start("StartMenuScene")
}

let mapSizeSlider = function mapSizeSlider(scene){
    scene.tileMapOptions.size = scene.SettingsContents.sizeSlider.value
}
let allowBiomes = function allowBiomes(scene){
    if ( scene.SettingsContents.allowBiomesCheckbox.state== false){
        scene.options.terrainGenerator = "complex"
    }else{
        scene.options.terrainGenerator = "complexBiomes"
    }
}
let debug = function debug(scene){
    scene.options.debug = scene.SettingsContents.debugCheckbox.state
}
export function setupGameSettings(scene){
    scene.options = scene.scene.get("StartMenuScene").options
    scene.tileMapOptions = scene.scene.get("StartMenuScene").tileMapOptions

    scene.SettingsContents = {} //pack hier die TextButtons rein
    // scene.sceneSettingsContents.exampleTextButton = new TextButton...
    //TextButtons to change variables
    const exampleTextStyle = { fontFamily: 'Arial Black', fontSize: 40, color: '#BBBBBB'};
    scene.SettingsContents.exampleTextButton = new TextButton(scene, 600,100,"BACK", exampleTextStyle,quitSettings)
    //slider to adjust mapSize
    const sliderStyle = { fontFamily: 'Arial Black', fontSize: 32, color: '#BBBBBB'};
    scene.SettingsContents.sizeSlider = new Slider(scene, 320, 600,20,200, "MAP SIZE", sliderStyle, mapSizeSlider)
    scene.SettingsContents.allowBiomesCheckbox = new Checkbox(scene, 320,520, "ALLOW BIOMES", sliderStyle, allowBiomes, true)
    scene.SettingsContents.debugCheckbox = new Checkbox(scene, 320,440, "DEBUG MODE", sliderStyle, debug, true)



}