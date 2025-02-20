export function setupCurrentTileMarker(game){

    game.currentTileMarker = game.add.graphics()
    const color = 0x000000;
    const thickness = 2;
    const alpha = 1;

    game.currentTileMarker.lineStyle(thickness, color, alpha);

    game.currentTileMarker.strokeRect(4,4, game.tileMap.tileWidth * 2* game.cameras.main.zoom, game.tileMap.tileHeight * 2* game.cameras.main.zoom);

}

export function getHoveredTile(game){

    // Rounds down to nearest tile
    const pointerTileX = game.tileMap.worldToTileX(game.mouse.worldPoint.x);
    const pointerTileY = game.tileMap.worldToTileY(game.mouse.worldPoint.y);
    //store the tile that is currently hovered
    if(pointerTileX < 0){pointerTileX = 0}
    if(pointerTileY < 0){pointerTileY = 0}
    game.currentHoveredTile = game.tileMap.getTileAt(pointerTileX, pointerTileY);
    // Snap to tile coordinates, but in world space
    game.currentTileMarker.x = game.tileMap.tileToWorldX(pointerTileX);
    game.currentTileMarker.y = game.tileMap.tileToWorldY(pointerTileY);
}
