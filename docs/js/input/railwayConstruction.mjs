import { placeRailwayStation } from "../simulation/railwayStation.mjs"
import { railwayLine } from "../simulation/railwayLine.mjs"

function deleteDuplicateStationPositions(stations){
    let uniqueStations = []
    for (let i = 0; i < stations.length; i++){
        if (uniqueStations.includes(stations[i]) == false){
            uniqueStations.push(stations[i])
        }
    }
    return uniqueStations
}

function checkIfSegmentExists(line, firstStationPosition, secondStationPosition){
    if(line.segments.length == 0){
        return false
    }
    //check if a segment with the same two positions exists already
    //TODO fix this
    for (let i = 0; i < line.segments.length; i++){
        if (line.segments[i][0] == firstStationPosition && line.segments[i][1] == secondStationPosition){
            return true
        }
        else if (line.segments[i][1] == firstStationPosition && line.segments[i][0] == secondStationPosition){
            return true
        } else {
            return false
        }
    }
}
function selectRailwayStation(game){
    //check if railway station does not exist at that position
    let mousePosition = game.currentHoveredTileIndexes
    let station = game.tileData[mousePosition.x][mousePosition.y].railwayStation
    if(station == null){
        return null
    } else {
        return mousePosition
    }
}
function placeLineSegment(game, firstStationPosition, secondStationPosition){
    if (game.railwayLines.length == 0){
        game.railwayLines.push(new railwayLine("red", 0))
    }
    let line = game.railwayLines[0]
    console.log(line)
    if(checkIfSegmentExists(line, firstStationPosition, secondStationPosition) == false){
        line.segments.push([firstStationPosition, secondStationPosition])
        line.stations.push(firstStationPosition)
        line.stations.push(secondStationPosition)
        line.stations = deleteDuplicateStationPositions(line.stations)
        console.log("created line sgment. line stations: " , line.stations)
    } else {
        console.log("segment already exists")
    }




}
export function railwayStationConstruction(game){

    if (game.mouse.justDown && game.isTilemapClicked){
        placeRailwayStation(game)
    }
}

let firstStationPosition = null
let secondStationPosition = null
export function railwayLineConstruction(game){

    if (game.mouse.justDown && game.isTilemapClicked){
        if (firstStationPosition == null){
            firstStationPosition = selectRailwayStation(game)
        } else {
            secondStationPosition = selectRailwayStation(game)
        }
        if(firstStationPosition != null && secondStationPosition != null){
            placeLineSegment(game, firstStationPosition, secondStationPosition)
            secondStationPosition = null
            firstStationPosition = null
        }

    }
}