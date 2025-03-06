import { placeRailwayStation } from "../simulation/railwayStation.mjs"

function placeRailway(game, tilePosition, line){
    this.tiles.push(tilePosition)
    //tilePosition should be an obj with x and y 
    game.tileData[tilePosition.x][tilePosition.y].railwayLines.push(line.id)


}
export function railwayLineConstruction(game){
    console.log(game.isTilemapClicked)
    if (game.mouse.justDown && game.isTilemapClicked){
        placeRailwayStation(game)
    }

    //TODO: #17 add railway line constructio logic here
}