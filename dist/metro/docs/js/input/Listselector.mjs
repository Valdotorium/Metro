export class Listselector{
    constructor(scene, x, y, text, style, callback, options, state){
        this.options = options
        this.state = state
        this.longestoption = 0
        this.longestoptionwidth = 0
        for (let i = 0; i < this.options.length; i++){
            this.testtext = scene.add.text(x, y, this.options[i], style)
            if (this.testtext.width >= this.longestoptionwidth){
                this.longestoption = i
                this.longestoptionwidth = this.testtext.width
            }
            this.testtext.destroy()
        }
        this.text = scene.add.text(x, y, this.options[this.longestoption], style)
        //add a rect
        this.rect = scene.add.rectangle(x, y, this.text.width + 100, this.text.height + 10, 0x222222)
        this.backarrow = scene.add.triangle(x - (this.text.width / 2) - 30, y, this.text.height, 0, 0, this.text.height / 2, this.text.height, this.text.height, 0xCCCCCC)
        this.nextarrow = scene.add.triangle(x + (this.text.width / 2) + 30, y, 0, 0, this.text.height, this.text.height / 2, 0, this.text.height, 0xCCCCCC)
        
        this.backarrow.setInteractive()
        this.nextarrow.setInteractive()
        this.rect.setOrigin(0.5, 0.5)
        //delete and readd the text
        this.text.destroy()
        this.text = scene.add.text(x, y, this.options[this.state], style)
        this.text.setOrigin(0.5, 0.5)
        this.label = scene.add.text(x, y - 50, text, style)
        this.label.setOrigin(0.5, 0.5)
        this.nextarrow.on('pointerdown', () => {this.activatenext(), callback(scene, this.state)})
        this.nextarrow.on('pointerup', () => this.deactivatenext())
        this.nextarrow.on("pointerover", () => this.hovernext())
        this.nextarrow.on("pointerout", () => this.outnext())
        this.backarrow.on('pointerdown', () => {this.activateback(), callback(scene, this.state)})
        this.backarrow.on('pointerup', () => this.deactivateback())
        this.backarrow.on("pointerover", () => this.hoverback())
        this.backarrow.on("pointerout", () => this.outback())
    }
    activatenext(){
            this.nextarrow.fillColor = 0x777777
            this.state++
            if(this.state >= this.options.length){
                this.state = 0
            }
            this.text.setText(this.options[this.state])
    }
    deactivatenext(){
        this.nextarrow.fillColor = 0xCCCCCC
    }
    hovernext(){
        this.nextarrow.fillColor = 0x777777
    }
    outnext(){
        this.nextarrow.fillColor = 0xCCCCCC
    }
    activateback(){
        this.backarrow.fillColor = 0x777777
        this.state--
        if(this.state < 0){
            this.state = this.options.length - 1
        }
        this.text.setText(this.options[this.state])
    }
    deactivateback(){
        this.backarrow.fillColor = 0xCCCCCC
    }
    hoverback(){
        this.backarrow.fillColor = 0x777777
    }
    outback(){
        this.backarrow.fillColor = 0xCCCCCC
    }
}