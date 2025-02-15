export class standardButton{

    constructor(game, x, y, text, clickFunction){
        //simple button thats clickable and contains text
        //standardButton parameters: the game object, x, y, text, the function thet is executed when clicking it
        
        this.x = x;
        this.y = y;
        this.text = text;
        this.game = game;
        this.isClicked = false;
        this.clickFunction = clickFunction;
        //create a text object with a fill color and a font style
        this.textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#eeeeee'};
        this.textObj = game.add.text(this.x, this.y, this.text, this.textStyle)
        //create a rectangle with a fill color
        //make it scale to the size of the text
        this.rect = game.add.rectangle(this.x, this.y , this.textObj.width + 10, this.textObj.height + 10, 0x333322)
        this.textObj.destroy()
        this.textObj = game.add.text(this.x, this.y, this.text, this.textStyle)

        this.textObj.setOrigin(0.5, 0.5);

        this.rect.setInteractive();
        game.input.on('pointerdown', (pointer, gameObject) =>
            {
                //executing the function when it is clicked.
                //warning: this parameter must have only one parameter: the game object
                this.clickFunction(this.game)
            });
        game.input.on('pointerup', (pointer, gameObject) =>
            {
            });
        game.input.on('pointerover', (pointer, gameObject) =>
            {
                this.hover()
            });
        game.input.on('pointerout', (pointer, gameObject) =>
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