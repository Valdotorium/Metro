
import { loadJSONFileWeb, loadJSONFileDesktop } from "./loadJSONFile.mjs"
export async function loadClientSaveGame(game){
    //load the game data from a JSON string
    //pause the start menu scene
    //TODO: #13 get native neutralino API to work properly
    if (game.options.isDesktopBuild){
        Neutralino.init();
        let data  = loadJSONFileDesktop(game)



    } else {
        let data = loadJSONFileWeb(game)
    }

    return data
    

}