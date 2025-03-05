export class Checkbox{
    constructor(scene, x, y, text, style, callback, state){
        this.text = scene.add.text(x, y, text, style)
        //add a rect
        this.rect = scene.add.rectangle(x, y, this.text.width + 10, this.text.height + 10, 0x222222)
        this.box = scene.add.rectangle(x + this.text.width - 20, y, this.text.height + 10, this.text.height + 10, 0x222222)
        this.box.setInteractive()
        this.rect.setOrigin(0.5, 0.5)
        //delete and readd the text
        this.text.destroy()
        this.text = scene.add.text(x, y, text, style)
        this.text.setOrigin(0.5, 0.5)
        this.state = state
        this.box.on('pointerdown', () => {this.activate(state), callback(scene)})
        this.box.on('pointerup', () => this.deactivate())
        this.box.on("pointerover", () => this.hover())
        this.box.on("pointerout", () => this.out())

    }
    activate(state){
        if (this.state == true) {
            this.state = false
            this.box.fillColor = 0x222222
        }
        else {
            this.state = true
            this.box.fillColor = 0xCCCCCC
        }
        console.log(this.state)
    }
    deactivate(){
    }
    hover(){
    }
    out(){
    }
}