export function setupMouse(game){
    //setup mouse controls
    game.mouse = game.input.activePointer
}
let counter = 0;
let cameraDragStartX;
let cameraDragStartY;
export function dragCamera(game){

    //update camera position based on mouse position if clicked och valle das wollte ich machen
    //TODO: #2 issue with window resizability and mouse position, need to keep height widt ratio constant?
    const camera = game.cameras.main;
    let pointer = game.input.activePointer;

    if (game.input.activePointer.isDown&&/*game.keys.get("SHIFT").isDown&&*/counter==1) {
        camera.scrollX = camera.scrollX + ((cameraDragStartX - pointer.x)/camera.zoom*1.2)
        camera.scrollY = camera.scrollY + ((cameraDragStartY - pointer.y)/camera.zoom*1.2)
    }
    if (game.input.activePointer.isDown&&counter==0/*&&game.keys.get("SHIFT").isDown*/){
        cameraDragStartX = pointer.x
        cameraDragStartY = pointer.y
        counter++
    }else{
        counter = 0
    }
    

}

export function touchSupport(game){
    game.input.on('pointerdown', function (pointer)
    {

        //this.mouse.x = pointer.x
        //this.mouse.y = pointer.y
        //this.mouse = pointer

    })
}
