
import { loadJSONFileWeb, loadJSONFileDesktop } from "./loadJSONFile.mjs"
export async function loadClientSaveGame(game){
    //load the game data from a JSON string
    //pause the start menu scene
    if (game.options.isDesktopBuild){
        Neutralino.init();
        let data  = loadJSONFileDesktop(game)

    } else {
        let data = loadJSONFileWeb(game)
    }

    return data
    
}