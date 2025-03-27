import { TextButton } from "../input/TextButton.mjs"
import { Slider } from "../input/slider.mjs"
import { Checkbox } from "../input/Checkbox.mjs"
import { Listselector } from "../input/Listselector.mjs"


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
let setGenerator = function setGenerator(scene, index){
    let generators = ["DEFAULT", "SIMPLE", "BIOMES", "COAST"]
    scene.options.terrainGenerator = generators[index]

        //temporary, replace with your own logic when you have i
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
    scene.SettingsContents.generatorSelector = new Listselector(scene, 600, 450,"MAP GENERATOR:",sliderStyle, setGenerator, ["DEFAULT", "SIMPLE", "BIOMES", "COAST"], 0) //temporary

    scene.SettingsContents.debugCheckbox = new Checkbox(scene, 520,540, "DEBUG MODE", sliderStyle, debug, true)



}
