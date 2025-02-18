
let counter = 0;
let cameraDragStartX;
let cameraDragStartY;
export function dragCamera(game){
    const camera = game.cameras.main;
    let pointer = game.input.activePointer;

    //temporary
    game.mouse = game.input.activePointer 
    game.mouse.x = pointer.x
    game.mouse.y = pointer.y

    if (pointer.isDown&&counter==1) {
        camera.scrollX = camera.scrollX + ((cameraDragStartX - pointer.x)/camera.zoom*2)
        camera.scrollY = camera.scrollY + ((cameraDragStartY - pointer.y)/camera.zoom*2)
    }
    if (pointer.isDown&&counter==0){
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
let con2 = 0;
export function touchzoom(game){
    if(game.input.pointer1.isDown&&game.input.pointer2.isDown){
        const camera = game.cameras.main;
        let dist1;
        let dist2;
        const pointer1 = game.input.pointer1;
        const pointer2 = game.input.pointer2
        if (pointer1.isDown&&con2==1) {
            dist1 = Math.sqrt(((pointer1.x - pointer2.x)**2)+((pointer1.y - pointer2.y)**2))
            let zoomdist = dist1 - dist2
            let tempzoom = camera.zoom - camera.zoom * 0.0001 * zoomdist;
            //camera.zoom = Phaser.Math.Clamp(tempzoom, 0.3, 5);
        }
        if (pointer1.isDown&&con2==0){
            dist2 = Math.sqrt(((pointer1.x - pointer2.x)**2)+((pointer1.y - pointer2.y)**2))
            con2++
        }else{
            con2 = 0
        }



}}

