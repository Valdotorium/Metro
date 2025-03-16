export function cameraControls(game){
    //controlling cam position and zoom with keyboard
    //zoom in or out if q or e are pressed
    if (game.keys.get("Q").isDown && game.cameras.main.zoom < 5) {
        game.cameras.main.zoom += 0.01;
    }
    if (game.keys.get("E").isDown && game.cameras.main.zoom > 0.3) {
        game.cameras.main.zoom -= 0.01;
    }
    //move with WASD
    if (game.keys.get("D").isDown) {
        game.cameras.main.scrollX += 10
    }
    if (game.keys.get("A").isDown) {
        game.cameras.main.scrollX -= 10
    }
    if (game.keys.get("S").isDown) {
        game.cameras.main.scrollY += 10
    }
    if (game.keys.get("W").isDown) {
        game.cameras.main.scrollY -= 10
    }
    if (game.keys.get("R").isDown) {
        game.cameras.main.scrollY = 10
        game.cameras.main.scrollX = 10
    }

}
