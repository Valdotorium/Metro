
let counter = 0;
let cameraDragStartX;
let cameraDragStartY;
export function dragCamera(game){
    //update camera position based on mouse position if clicked och valle das wollte ich machen
    const camera = game.cameras.main;
    let pointer = game.input.activePointer;

    //temporary
    game.mouse = game.input.activePointer //probably not always update this, fix later
    game.mouse.x = pointer.x
    game.mouse.y = pointer.y

    if (pointer.isDown&&/*game.keys.get("SHIFT").isDown&&*/counter==1) {
        camera.scrollX = camera.scrollX + ((cameraDragStartX - pointer.x)/camera.zoom*2)
        camera.scrollY = camera.scrollY + ((cameraDragStartY - pointer.y)/camera.zoom*2)
    }
    if (pointer.isDown&&counter==0/*&&game.keys.get("SHIFT").isDown*/){
        cameraDragStartX = pointer.x
        cameraDragStartY = pointer.y
        counter++
    }else{
        counter = 0
    }

}
export function mousewheelzoom(game){
    game.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
        
        const camera = game.cameras.main;
        const worldPoint = camera.getWorldPoint(pointer.x, pointer.y);
        const zoomnew = camera.zoom - camera.zoom * 0.001 * deltaY;
        camera.zoom = Phaser.Math.Clamp(zoomnew, 0.3, 5);
        camera.preRender();
        const camanker = camera.getWorldPoint(pointer.x, pointer.y);
        camera.scrollX -= camanker.x - worldPoint.x;
        camera.scrollY -= camanker.y - worldPoint.y;
    });
}

