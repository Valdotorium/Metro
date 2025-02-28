

export async function loadJSONFile(game){


    var link = document.createElement("input");
    link.type = "file";
    document.body.appendChild(link);
    link.click();


    //pause game scene
    
    //wait until the user submits a file
    async function checkFlag() {
    //wait until loaded game data is not none
    let data = await new Promise(resolve => link.onchange = resolve);
    data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(link.files[0]);

    });
    //log the data first
    console.log(data);
    game.scene.get("GameScene").loadedGameData = JSON.parse(data);
    //and then start the game scene
    game.scene.start("GameScene")
    game.scene.stop("StartMenuScene")
    // remove the file input element
    document.body.removeChild(link);
    }

    let data = await checkFlag();
    console.log(data);
    return data

}