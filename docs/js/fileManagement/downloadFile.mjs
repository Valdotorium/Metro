import { saveGame } from "./gameDataToJSON.mjs";

export function downloadFileWeb(game) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:json/plain;charset=utf-8,' + saveGame(game.scene.get("GameScene")));
    element.setAttribute('download', "savegame.json");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

export async function saveFileDesktop(game) {

  let data = saveGame(game.scene.get("GameScene"))
  
  Neutralino.init();
  let entry
  //select directory to save file in
  try{entry = await Neutralino.os.showFolderDialog('Select save directory', {
    defaultPath: './'
  });} catch(e){
    await Neutralino.os.showMessageBox("information", "COULD NOT GET DIRECTORY:  " + e.message)
  }

  //join the path with "savegame.json"
  //get current date and time
  let dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

  //construct the full path with date and time in the filename
  let filePath = entry + "/savegame_" + dateTime + ".json"


  //save the file
  try{ 
    await Neutralino.filesystem.writeFile(filePath, data);
    await Neutralino.os.showMessageBox("information", "Savegame saved to: " + filePath);
  } catch(e){
    await Neutralino.os.showMessageBox("information", "COULD NOT WRITE TO FILE:  " + e.message)
  }
  
}