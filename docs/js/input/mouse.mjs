export function setupMouse(game){
    //setup mouse controls
    game.mouse = game.input.activePointer
}

export function dragCamera(game){

    //update camera position based on mouse position if clicked
    console.log(game.mouse.x, game.mouse.y)
    if (game.mouse.x < 50 || game.mouse.y < 50 || game.mouse.x > game.scale.width - 50 || game.mouse.y > game.scale.height - 50){
        const scrollFactor = 0.03;
        game.cameras.main.scrollX += (game.mouse.x - game.cameras.main.centerX) * scrollFactor;
        game.cameras.main.scrollY += (game.mouse.y - game.cameras.main.centerY) * scrollFactor;  
    }



}