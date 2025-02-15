export class standardButton{

    constructor(parent, x, y, text, clickFunction){
        //simple button thats clickable and contains text
        //standardButton parameters: the game object, x, y, text, the function thet is executed when clicking it
        
        this.x = x;
        this.y = y;
        this.text = text;
        this.parent = parent;
        this.isHovered = false;
        this.clickFunction = clickFunction;
        //create a text object with a fill color and a font style
        this.textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#eeeeee'};
        this.textObj = parent.add.text(this.x, this.y, this.text, this.textStyle)
        //create a rectangle with a fill color
        //make it scale to the size of the text
        this.rect = parent.add.rectangle(this.x, this.y , this.textObj.width + 10, this.textObj.height + 10, 0x333322)
        this.textObj.destroy()
        this.textObj = parent.add.text(this.x, this.y, this.text, this.textStyle)

        this.textObj.setOrigin(0.5, 0.5);

        this.rect.setInteractive();
        parent.input.on('gameobjectdown', (pointer, gameObject) =>
            {
                //executing the function when it is clicked.
                //warning: this parameter must have only one parameter: the game object
                this.clickFunction(this.parent.scene.get("GameScene"))
                this.textObj.setColor("#eeeeee")
            });
        parent.input.on('gameobjectup', (pointer, gameObject) =>
            {
                this.textObj.setColor("#333322")
            });
        parent.input.on('pointerover', (pointer, gameObject) =>
            {
                this.hover()
            });
        parent.input.on('pointerout', (pointer, gameObject) =>
            {
                this.unhover()
            });

        
    }

    hover(){
        console.log("hover")
        this.textObj.setColor("#333322")
        this.rect.fillColor=0xeeeeee
    }
    unhover(){
        console.log("unhover")
        this.textObj.setColor("#eeeeee")
        this.rect.fillColor=0x222233
    }
}