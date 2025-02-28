
import { loadJSONFile } from "./loadJSONFile.mjs"
export async function loadClientSaveGame(game){
    //load the game data from a JSON string
    //pause the start menu scene
    //TODO: #13 get native neutralino API to work properly
    if (game.options.isDesktopBuild){
        Neutralino.init();

        let entries = await Neutralino.os.showOpenDialog('Open a diagram', {
            defaultPath: './',
            filters: [
              {name: 'Images', extensions: ['jpg', 'png']},
              {name: 'All files', extensions: ['*']}
            ]
          });
          console.log('You have selected:', entries);

    } else {
        let data = loadJSONFile(game)
    }

    return data
    

}