export function debugText(scene) {
    const gameScene = scene.scene.get("GameScene")
    scene.text.setText([
        `mouse over tile: ${gameScene.currentHoveredTileIndexes.x}, ${gameScene.currentHoveredTileIndexes.y}`,
        `duration: ${gameScene.mouse.getDuration()}`,
        `selected Tile: ${gameScene.currentSelectedTile.x}, ${gameScene.currentSelectedTile.y}`,
        `type: ${gameScene.generatedTilemap[gameScene.currentSelectedTile.x][gameScene.currentSelectedTile.y]} population: ${gameScene.tileData[gameScene.currentSelectedTile.x][gameScene.currentSelectedTile.y].population}`,
        `zoom: ${gameScene.cameras.main.zoom}`,
        `simulation speed: ${gameScene.simulation.speed}`
    ])
}