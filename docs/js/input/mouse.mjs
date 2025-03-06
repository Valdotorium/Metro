let counter = 0;
let cameraDragStartX;
let cameraDragStartY;
export function updateMouse(game){
    if(!game.input.pointer2.isDown){
        const camera = game.cameras.main;
        let pointer = game.input.activePointer;

        //creating the universal game.mouse object with important state variables
        game.mouse = game.input.activePointer 
        game.mouse.x = pointer.x
        game.mouse.y = pointer.y
        game.mouse.justDown = pointer.isDown && !game.mouse.wasDown;
        if (game.mouse.isDown){
            game.mouse.wasDown = true
        } else {
            game.mouse.wasDown = false
        }
    }
}
export function dragCamera(game){
    const camera = game.cameras.main;
    let pointer = game.input.activePointer;
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
let dist1;
let dist2;
export function touchzoom(game){

    let zoomdist;
    let tempzoom;
    if(game.input.pointer1.isDown&&game.input.pointer2.isDown){
        const camera = game.cameras.main;

        const pointer1 = game.input.pointer1;
        const pointer2 = game.input.pointer2
        if (pointer1.isDown&&con2==1) {
            dist1 = Math.sqrt(((pointer1.x - pointer2.x)**2)+((pointer1.y - pointer2.y)**2))
            zoomdist = dist1 - dist2
            if(Math.abs(zoomdist) > 40){zoomdist = 0}
            tempzoom = camera.zoom + camera.zoom * 0.005 * zoomdist;
            if(tempzoom < 0.3){
                tempzoom = 0.3
            }else if(tempzoom > 5){
                tempzoom = 5
            }
            camera.zoom = tempzoom
        }
        if (pointer1.isDown&&con2==0){
            dist2 = Math.sqrt(((pointer1.x - pointer2.x)**2)+((pointer1.y - pointer2.y)**2))
            con2++
        }else{
            con2 = 0
        }
    }
    //game.mousetext.setText([
    //    `p1down: ${game.input.pointer1.isDown}, p2down ${game.input.pointer2.isDown}`,
    //    `zoomdist: ${zoomdist}`,
    //    `tempzoom: ${tempzoom}`,
    //    `tempzoom: ${tempzoom}`,
    //    `lastactivepointer: ${game.input.activePointer.id}`,
    //])
}

