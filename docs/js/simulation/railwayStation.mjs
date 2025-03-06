//format for railway stations:
//{
// passengers: number
// lines: [number]
// image: Phaser image
//}
export function placeRailwayStation(game){
    //check if railway station does not exist at that position
    let mousePosition = game.currentHoveredTileIndexes
    let station = game.tileData[mousePosition.x][mousePosition.y].railwayStation
    if(station == null){
        station= {}
        station.passengers = 0
        station.lines = []
        station.image = game.add.image(mousePosition.x * 6 * game.scale, mousePosition.y * 6 * game.scale, "Station").setScale(game.scale).setOrigin(-0.5,-0.5)


    }

}