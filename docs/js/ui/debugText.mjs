export function debugText(scene) {
    const gameScene = scene.scene.get("GameScene")
    scene.text.setText([
        `mouse over tile: ${gameScene.currentHoveredTileIndexes.x}, ${gameScene.currentHoveredTileIndexes.y}`,

        `selected Tile: ${gameScene.currentSelectedTile.x}, ${gameScene.currentSelectedTile.y}`,
        `type: ${gameScene.generatedTilemap[gameScene.currentSelectedTile.x][gameScene.currentSelectedTile.y]} population: ${gameScene.tileData[gameScene.currentSelectedTile.x][gameScene.currentSelectedTile.y].population}`,
        `has connections to: ${gameScene.tileData[gameScene.currentSelectedTile.x][gameScene.currentSelectedTile.y].railwayStation != null ? gameScene.tileData[gameScene.currentSelectedTile.x][gameScene.currentSelectedTile.y].railwayStation.lines : "none"}`,
        `fps ${gameScene.fps}`,
        `simulation speed: ${gameScene.simulation.speed}`
    ])
}