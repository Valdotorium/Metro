export function drawTileMap(game){
    //draw a tile image on the screen for each tile in tilemap
    game.tileMap.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
            if(tile == 1){
                game.add.image(tileIndex * 20, rowIndex * 20, "tile");
            }
        })
    })
}