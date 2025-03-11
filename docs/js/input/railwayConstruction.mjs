import { placeRailwayStation } from "../simulation/railwayStation.mjs"
import { railwayLine } from "../simulation/railwayLine.mjs"
import { addRailwaySegmentGraphics, deleteRailwayConstructionGraphics, railwayLineDragging } from "../graphics/railwayLineGraphics.mjs"

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
        if (JSON.stringify(line.segments[i][0]) == JSON.stringify(firstStationPosition) && JSON.stringify(line.segments[i][1]) == JSON.stringify(secondStationPosition)){
            return true
        }
        else if (JSON.stringify(line.segments[i][1]) == JSON.stringify(firstStationPosition) && JSON.stringify(line.segments[i][0]) == JSON.stringify(secondStationPosition)){
            return true
        }
    }
    return false
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

function addLineGraphics(game, line, firstStationPosition, secondStationPosition){
    let lineObj
    let sceneFirstStationPosition = game.tileMap.tileToWorldXY(firstStationPosition.x, firstStationPosition.y)
    let sceneSecondStationPosition = game.tileMap.tileToWorldXY(secondStationPosition.x, secondStationPosition.y)
    // +3 to center the line in the tiles
    lineObj = game.add.line(0,0, sceneFirstStationPosition.x + 18, sceneFirstStationPosition.y + 18, sceneSecondStationPosition.x + 18, sceneSecondStationPosition.y + 18,  line.color).setOrigin(0);
    lineObj.setLineWidth(5);
    

}
function placeLineSegment(game, firstStationPosition, secondStationPosition){
    if (game.railwayLines.length == 0){
        game.railwayLines.push(new railwayLine(0xff0000, 0))
    }
    let line = game.railwayLines[0]
    console.log(line)
    if(!checkIfSegmentExists(line, firstStationPosition, secondStationPosition)){
        line.segments.push([firstStationPosition, secondStationPosition])
        line.stations.push(firstStationPosition)
        line.stations.push(secondStationPosition)
        line.stations = deleteDuplicateStationPositions(line.stations)
        console.log("created line segment. line stations: " , line.stations)
        try{
            addRailwaySegmentGraphics(game, line, firstStationPosition, secondStationPosition)
        } catch (e){
            console.log("error", e)
        }

    } else {
        console.log("segment already exists", firstStationPosition, secondStationPosition)
    }
}
export function railwayStationConstruction(game){

    if (game.mouse.justDown && game.isTilemapClicked){
        placeRailwayStation(game)
    }
}
let lineConstruction = false
let firstStationPosition = null
let secondStationPosition = null
export function railwayLineConstruction(game){
    if (game.mouse.justDown && game.isTilemapClicked){
        if (firstStationPosition == null && selectRailwayStation(game) != null){
            firstStationPosition = selectRailwayStation(game)
            lineConstruction = true
        } 
        }else {
            if (lineConstruction == true && selectRailwayStation(game) != null && JSON.stringify(selectRailwayStation(game)) != JSON.stringify(firstStationPosition)){
                console.log(selectRailwayStation(game))
                secondStationPosition = selectRailwayStation(game)
            } 
        if(firstStationPosition != null && secondStationPosition != null){
            placeLineSegment(game, firstStationPosition, secondStationPosition)
            secondStationPosition = null
            firstStationPosition = null
            lineConstruction = false
        }
    }
    if(lineConstruction == true){
        //make user hold mouse to drag
        if(game.mouse.isDown){
            railwayLineDragging(game, firstStationPosition)
        }else{
            deleteRailwayConstructionGraphics(game)
            lineConstruction = false
            firstStationPosition = null
        }
    }
}