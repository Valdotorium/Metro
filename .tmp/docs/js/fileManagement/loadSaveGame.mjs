import { Neutralino } from "../neutralino.js"
import { loadJSONFile } from "./loadJSONFile.mjs"
export async function loadClientSaveGame(game){
    //load the game data from a JSON string
    //pause the start menu scene
    //TODO: #13 get native neutralino API to work properly
    if (game.options.isDesktopBuild){
        Neutralino.init();

        Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');

    } else {
        let data = loadJSONFile(game)
    }

    return data
    

}