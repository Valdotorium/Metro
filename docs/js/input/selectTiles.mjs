export function setupCurrentTileMarker(scene){
    //rectangle around the current hovered tile
    scene.currentTileMarker = scene.add.graphics()
    const color = 0x000000;
    const thickness = 2;
    const alpha = 1;

    scene.currentTileMarker.lineStyle(thickness, color, alpha);

    scene.currentTileMarker.strokeRect(4,4, scene.tileMap.tileWidth * 2* scene.cameras.main.zoom, scene.tileMap.tileHeight * 2* scene.cameras.main.zoom);

}

export function getHoveredTile(scene){

    // Rounds down to nearest tile
    if(scene.mouse.worldPoint.x < 0){scene.mouse.worldPoint.x = 0} 
    if(scene.mouse.worldPoint.y < 0){scene.mouse.worldPoint.y = 0}
    let pointerTileX = scene.tileMap.worldToTileX(scene.mouse.worldPoint.x);
    let pointerTileY = scene.tileMap.worldToTileY(scene.mouse.worldPoint.y);
    //keeping the pointer tile within the tilemap
    if(pointerTileX <0){pointerTileX = 0}
    if(pointerTileY <0){pointerTileY = 0}
    if(pointerTileX > scene.tileMapOptions.size -1){pointerTileX = scene.tileMapOptions.size -1}
    if(pointerTileY > scene.tileMapOptions.size -1){pointerTileY = scene.tileMapOptions.size -1}
    //store the tile that is currently hovered
    scene.currentHoveredTileIndexes = {x: pointerTileX, y: pointerTileY}
    scene.currentHoveredTile = scene.tileMap.getTileAt(pointerTileX, pointerTileY);
    // Snap to tile coordinates, but in world space
    scene.currentTileMarker.x = scene.tileMap.tileToWorldX(pointerTileX);
    scene.currentTileMarker.y = scene.tileMap.tileToWorldY(pointerTileY);
}
