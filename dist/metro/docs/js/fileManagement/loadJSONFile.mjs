

export async function loadJSONFileWeb(game){


    var link = document.createElement("input");
    link.type = "file";
    document.body.appendChild(link);
    link.click();
    async function checkFlag() {
        //wait until loaded game data exists
        let data = await new Promise(resolve => link.onchange = resolve);
        data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsText(link.files[0]);

        });
        //log the data first
        console.log(data);
        //phaserjs functions
        game.scene.get("GameScene").loadedGameData = JSON.parse(data);
        //and then start the game scene
        game.scene.start("GameScene")
        game.scene.stop("StartMenuScene")
        // remove the file input element
        document.body.removeChild(link);
    }
    //wait until the user submits a file
    let data = await checkFlag();
    console.log(data);
    return data

}
export async function loadJSONFileDesktop(game){
    let entries = await Neutralino.os.showOpenDialog('Open a diagram', {
        defaultPath: '/',
        filters: [
          {name: 'All files', extensions: ['*']}
        ]
      });
      console.log('You have selected:', entries);

    //show a dialog box showing entries[0]
    await Neutralino.os.showMessageBox("information", "You have selected: " + entries[0]);
    let data;
    try{data = await Neutralino.filesystem.readFile(entries[0]);} catch(e){
        await Neutralino.os.showMessageBox("information", "COULD NOT GET:  " + entries[0] + e.message)
    }
    //parse the JSON
    game.scene.get("GameScene").loadedGameData = JSON.parse(data);
    //and then start the game scene
    game.scene.start("GameScene")
    game.scene.stop("StartMenuScene")

    return data
}