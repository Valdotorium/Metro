export class dialogBox{
    constructor(scene, text, style, optionsnames, options){
        this.text = scene.add.text(600, 400, text, style)
        this.rect = scene.add.rectangle(600, 400, this.text.width + 10, this.text.height + 10 + 56, 0xBBBBBB)
        this.rect.setOrigin(0.5, 0.5)
        this.text.destroy()
        this.text = scene.add.text(600, 400, text, style)
        this.text.setOrigin(0.5, 0.5)
        this.topbar = scene.add.rectangle(600, 400 - 35 - (this.text.height / 2), this.text.width + 10, 30, 0x222222)
        this.exit = scene.add.rectangle(600 + (this.text.width / 2) - 10, 400 - 35 - (this.text.height / 2), 30, 30, 0xBB2222)
        this.exit.setInteractive()

        this.exit.on('pointerdown', () => {destroyObject(scene, this)})
    }
}

//IN PROGRESS