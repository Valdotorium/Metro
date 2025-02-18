export function setupCurrentTileMarker(game){
    game.currentTileMarker = game.add.graphics();
    game.currentTileMarker.lineStyle(4, 0x000000, 2);
    game.currentTileMarker.strokeRect(0, 0, game.tileMap.tileWidth * game.tileMap.layer.scaleX * game.cameras.main.zoom, game.tileMap.tileHeight * game.tileMap.layer.scaleY* game.cameras.main.zoom);
}

export function getHoveredTile(game){
    
        // Rounds down to nearest tile
        const pointerTileX = game.tileMap.worldToTileX(game.mouse.worldPoint.x);
        const pointerTileY = game.tileMap.worldToTileY(game.mouse.worldPoint.y);

        //log data
        console.log(`Hovered Tile: ${pointerTileX}, ${pointerTileY}`);

        // Update marker position
        game.currentTileMarker.setPosition(game.tileMap.tileToWorldX(pointerTileX), game.tileMap.tileToWorldY(pointerTileY));

        // Snap to tile coordinates, but in world space
        game.currentTileMarker.x = game.tileMap.tileToWorldX(pointerTileX);
        game.currentTileMarker.y = game.tileMap.tileToWorldY(pointerTileY);

        //TODO: #5 make the rectangle visible @Valdotorium
        game.currentTileMarker.depth = 0
}