
async function showInfo(text){
    //show neutralino dialog box
    await Neutralino.os.showMessageBox("information", text);
}
export function initializeDesktopApp(game){
    try{
        //initialize desktop app
        Neutralino.init();
        //TODO: #15 make a dialog box appear when neutralino loaded successfully.
        //show a info window that neutralino started successfully
        showInfo("Neutralino initialized successfully.")

        //set variables:
        game.options.neutralinoConfig = {}
        game.options.neutralinoConfig.defaultPath = "./"
    } catch(e){
        game.options.isDesktopBuild = false

        console.error("Failed to initialize desktop app:", e)

    }


   
}