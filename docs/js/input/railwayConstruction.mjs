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
export function getUniqueStationsFromSegments(line){

    let stations = []
    for (let segment of line.segments){
        stations.push(segment.firstStation)
        stations.push(segment.secondStation)
    }
    return deleteDuplicateStationPositions(stations)
}
function checkIfSegmentExists(line, firstStationPosition, secondStationPosition){
    if(line.segments.length == 0){
        return false
    }
    //check if a segment with the same two positions exists already
    //TODO fix this
    for (let i = 0; i < line.segments.length; i++){
        if (JSON.stringify(line.segments[i].firstStation) == JSON.stringify(firstStationPosition) && JSON.stringify(line.segments[i].secondStation) == JSON.stringify(secondStationPosition)){
            return true
        }
        else if (JSON.stringify(line.segments[i].secondStation) == JSON.stringify(firstStationPosition) && JSON.stringify(line.segments[i].firstStation) == JSON.stringify(secondStationPosition)){
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

function placeLineSegment(game, firstStationPosition, secondStationPosition){
    
    if (game.railwayLines.length == game.selectedRailwayLine){
        game.railwayLines.push(new railwayLine(game.railwayLineColors[game.selectedRailwayLine], 0))
    }
    let line = game.railwayLines[game.selectedRailwayLine]
    console.log(line)

    let segment = {}
    if(!checkIfSegmentExists(line, firstStationPosition, secondStationPosition)){
        segment.firstStation = firstStationPosition
        segment.secondStation = secondStationPosition
        line.stations.push(firstStationPosition)
        line.stations.push(secondStationPosition)
        line.stations = deleteDuplicateStationPositions(line.stations)
        console.log("created line segment. line stations: " , line.stations)
        try{
            segment.lines = []
            segment = addRailwaySegmentGraphics(game, segment, firstStationPosition, secondStationPosition)
            line.segments.push(segment)
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
            deleteRailwayConstructionGraphics(game)
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

export function createLinesFromSaveGame(game){
    console.log(game.loadedGameData.railwayLines)
    for(let i = 0; i < game.loadedGameData.railwayLines.length; i++){
        console.log("E")
        let line = game.loadedGameData.railwayLines[i]
        let newLine = new railwayLine(line.color, line.id)
        newLine.stations = line.stations
        for(let segment of line.segments){
            let newSegment = {}
            newSegment.firstStation = segment.firstStation
            newSegment.secondStation = segment.secondStation
            newSegment.lines = []
            newSegment = addRailwaySegmentGraphics(game, newSegment, segment.firstStation, segment.secondStation)
            newLine.segments.push(newSegment)
        }
        game.railwayLines.push(newLine)
    }
}

