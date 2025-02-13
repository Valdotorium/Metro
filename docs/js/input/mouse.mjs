export function setupMouse(game){
    //setup mouse controls
    game.mouse = game.input.activePointer
}

export function dragCamera(game){

    //update camera position based on mouse position if clicked och valle das wollte ich machen
    //TODO: #2 issue with window resizability and mouse position, need to keep height widt ratio constant?
    const camera = game.cameras.main;
    let cameraDragStartX;
    let cameraDragStartY;
    let pointer = game.input.activePointer;
    //if(pointer.isDown){
        //cameraDragStartX = camera.scrollX;
        //cameraDragStartY = camera.scrollY;
    //};

    if (game.input.activePointer.isDown&&game.keys.get("SHIFT").isDown) {
        cameraDragStartX = camera.scrollX;
        cameraDragStartY = camera.scrollY;
        camera.scrollX = cameraDragStartX + (pointer.downX - pointer.x) * game.cameras.main.zoom/10;
        camera.scrollY = cameraDragStartY + (pointer.downY - pointer.y) * game.cameras.main.zoom/10;
        //console.log("aaaaaaaaaaaaaaaaa")
    }
    ;




}

export function touchSupport(game){
    game.input.on('pointerdown', function (pointer)
    {

        //this.mouse.x = pointer.x
        //this.mouse.y = pointer.y
        //this.mouse = pointer

    })
}
