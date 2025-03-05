
export class ImageButton{
    constructor(scene, x, y, image, sizeX, sizeY, callback){
        //instead of text, display a clickable image

        this.text = scene.add.image(x, y, image)
        this.text.setScale(sizeX / this.text.width, sizeY / this.text.height)
        this.text.setInteractive()
        this.text.on('pointerdown', () => {this.activate(), callback(scene)})
        this.text.on('pointerup', () => this.deactivate())
        this.text.on("pointerover", () => this.hover())
        this.text.on("pointerout", () => this.out())
        this.text.setTint(0x444444)


    }
    activate(){
        this.text.setTint(0x999999)  
    }
    deactivate(){
        this.text.setTint(0x444444)
    }
    hover(){
        this.text.setTint(0x777777)
    }
    out(){
        this.text.setTint(0x444444)
    }
}
