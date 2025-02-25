
export class Slider{

    updateHover(){
        let mouseX = this.game.input.activePointer.x
        let mouseY = this.game.input.activePointer.y
        //console.log("X:", this.rect.x - this.width/2 ,", ", mouseX, " ,",this.rect.x + this.width/2)
        //console.log("Y:", this.rect.y - this.height/2 ,", ", mouseY, " ,",this.rect.y + this.height/2)

        if( this.rect.x - this.width/2 - 10 <= mouseX <= this.rect.x + this.width/2 + 10 && this.rect.y - this.height/2 <= mouseY <= this.rect.y + this.height/2){
            console.log("E")
            this.hover()
        }
    }
    constructor(game, x, y,min,max, text, style, callback){

        this.text = game.add.text(x, y, text+ " : "+ this.value, style)
        this.min = min 
        this.max = max
        this.range = max - min
        this.game = game
        //add a rect next to the text
        this.rect = game.add.rectangle(x +this.text.width - 15, y, this.text.width + 20, this.text.height + 10, 0x222222)
        this.rect.setInteractive()
        this.rect.setOrigin(0.5, 0.5)


        //some slider variables
        this.width = this.text.width + 20
        this.height = this.text.height + 10
        this.value = this.max
        this.callback = callback

        //delete and readd the text
        this.text.destroy()
        this.text = game.add.text(x, y, text+ " : "+ this.value, style)
        this.text.setOrigin(0.5, 0.5)

        this.value = Math.round(this.min + this.range/2)
        this.updateValueText()

        //draw a brighter rectangle indicating the current slider value
        this.sliderValueRect = game.add.rectangle(this.rect.x - this.width/2, this.rect.y, (this.value - this.min) / this.range * this.width, this.rect.height, 0xBBBBBB)
        this.sliderValueRect.setOrigin(0, 0.5)
        //this.sliderValueRect.setDepth(1) //so it appears above the text and rect

        this.rect.on("pointermove", () => this.updateHover())

        this.rect.on("pointerout", () => this.out())

    }
    updateValueText(){
        this.text.setText(this.text.text.split(" : ")[0] + " : " + this.value)
    }
    updateSliderValueRect(){
        this.sliderValueRect.width = (this.value - this.min) / this.range * this.width
    }
    activate(){
        //update this.value based on mouse x position from own x position
        //you can use this.rect.x and this.width to calculate this.value
        //this.value should be between 0 and 1
        let mouseX = this.game.input.activePointer.x

        this.value = Math.round(((mouseX - this.rect.x +this.width/2) / this.width) * this.range + this.min)
        if(this.value < this.min) this.value = this.min
        if(this.value > this.max) this.value = this.max
        this.updateValueText()
        this.updateSliderValueRect()
        this.callback(this.game) //call the callback function with the current value of this slider

    }
    deactivate(){
    }
    hover(){
        this.rect.fillColor = 0x444444
        if (!this.game.input.activePointer.noButtonDown()){
            this.activate()

        }

    }
    out(){
        this.rect.fillColor = 0x222222
    }
}