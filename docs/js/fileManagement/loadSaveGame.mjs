import { loadJSONFile } from "./loadJSONFile.mjs"
export async function loadClientSaveGame(game){
    //load the game data from a JSON string
    //pause the start menu scene
    //TODO: #13 get native neutralino API to work properly

    let data = loadJSONFile(game)
    return data
    

}