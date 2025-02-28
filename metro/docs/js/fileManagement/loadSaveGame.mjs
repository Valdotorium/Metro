
import { loadJSONFile } from "./loadJSONFile.mjs"
export async function loadClientSaveGame(game){
    //load the game data from a JSON string
    //pause the start menu scene
    //TODO: #13 get native neutralino API to work properly
    if (game.options.isDesktopBuild){
        Neutralino.init();
        //open file dialog
        const link = document.createElement('input');
        link.type = 'file';
        link.click();
        link.onchange = async () => {
            data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(JSON.parse(reader.result));
                reader.onerror = reject;
                reader.readAsText(link.files[0]);
            })
            game.loadedGameData = data
        }

        Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');

    } else {
        let data = loadJSONFile(game)
    }

    return data
    

}