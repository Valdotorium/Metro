import {getUniqueStationsFromSegments} from "./railwayConstruction.mjs"


function removeStationDependencies(game, stationPosition){
    //check if station is in a line
    for (let i = 0; i < game.railwayLines.length; i++){
        let line = game.railwayLines[i]
        //removing all segments connected to the stations
        for(let j = 0; j < line.segments.length; j++){
            let segment = line.segments[j]
            if (JSON.stringify(segment.firstStation) == JSON.stringify(stationPosition) || JSON.stringify(segment.secondStation) == JSON.stringify(stationPosition)){
                for (let object of segment.lines){
                    object.destroy()
                }
                segment.lines = []
                line.segments.splice(j, 1)
                j--
                line.stations = getUniqueStationsFromSegments(line)
            }
        }

        game.railwayLines[i] = line
    }
}

export function clearTile(game){
    let mousePosition = game.currentHoveredTileIndexes
    console.log(game.tileData[mousePosition.x][mousePosition.y].railwayStation)

    //removing railway stations
    if(game.tileData[mousePosition.x][mousePosition.y].railwayStation != null && game.mouse.justDown){
        console.log("HOWLOW")
        removeStationDependencies(game, mousePosition)
        game.tileData[mousePosition.x][mousePosition.y].railwayStation.image.destroy()
        game.tileData[mousePosition.x][mousePosition.y].railwayStation = null
    }
}