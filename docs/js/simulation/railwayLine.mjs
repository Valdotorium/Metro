//HOW RAILWAYS WORK:
//the railwayLine objects hold the data of the railway lines
//in game.tileData, game.tileData.railwayLines is storing the lines that go over each forkin tile of the whole forkin map

export class railwayLine{
    constructor(color, id){
        
        this.color = color
        this.id = id
        this.tiles = []
        this.trainCapacity = 1 + Math.floor(this.tiles.length / 5)
        this.trains = []
    }
}