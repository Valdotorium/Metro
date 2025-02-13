export function debugText(game) {
    const gameScene = game.scene.get("GameScene")
    game.text.setText([
        `mouseX: ${gameScene.mouse.x}`,
        `mouseY: ${gameScene.mouse.y}`,
        `duration: ${gameScene.mouse.getDuration()}`,
        `window Dimensions: ${gameScene.windowWidth, gameScene.windowHeight}`,
        `zoom: ${gameScene.cameras.main.zoom}`
    ])
}