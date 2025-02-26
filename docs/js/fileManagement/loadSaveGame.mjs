import { loadJSONFile } from "./loadJSONFile.mjs"
export async function loadClientSaveGame(game){
    //load the game data from a JSON string
    //pause the start menu scene
    let data = loadJSONFile(game)
    return data

}