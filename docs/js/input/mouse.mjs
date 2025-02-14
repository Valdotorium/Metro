export function setupMouse(game){
    //setup mouse controls
    game.mouse = game.input.activePointer
}
let counter = 0;
export function dragCamera(game){

    //update camera position based on mouse position if clicked och valle das wollte ich machen
    //TODO: #2 issue with window resizability and mouse position, need to keep height widt ratio constant?
    const camera = game.cameras.main;
    let cameraDragStartX;
    let cameraDragStartY;
    let pointer = game.input.activePointer;
    
    if (game.input.activePointer.isDown&&counter==0){
        console.log(pointer.y,pointer.x)
        
        counter++
    }
    game.input.on(
        "pointerup",
        function (pointer) {
          counter = 0;
        })

    if (game.input.activePointer.isDown&&game.keys.get("SHIFT").isDown) {

        camera.scrollX = pointer.x + cameraDragStartX;
        camera.scrollY = pointer.y + cameraDragStartY;
        console.log("aaaaaaaaaaaaaaaaa")
    };




}

export function touchSupport(game){
    game.input.on('pointerdown', function (pointer)
    {

        //this.mouse.x = pointer.x
        //this.mouse.y = pointer.y
        //this.mouse = pointer

    })
}
