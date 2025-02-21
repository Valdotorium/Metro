export function debugText(game) {
    const gameScene = game.scene.get("GameScene")
    game.text.setText([
        `mouse over tile: ${gameScene.currentHoveredTileIndexes.x}, ${gameScene.currentHoveredTileIndexes.y}`,
        `duration: ${gameScene.mouse.getDuration()}`,
        `selected Tile: ${gameScene.currentSelectedTile.x}, ${gameScene.currentSelectedTile.y}`,
        `type: ${gameScene.generatedTilemap[gameScene.currentSelectedTile.x][gameScene.currentSelectedTile.y]} population: ${gameScene.tileData[gameScene.currentSelectedTile.x][gameScene.currentSelectedTile.y].population}`,
        `zoom: ${gameScene.cameras.main.zoom}`
    ])
}