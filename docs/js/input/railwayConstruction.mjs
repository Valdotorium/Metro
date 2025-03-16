import { placeRailwayStation } from "../simulation/railwayStation.mjs"
import { railwayLine } from "../simulation/railwayLine.mjs"
import { addRailwaySegmentGraphics, deleteRailwayConstructionGraphics, railwayLineDragging } from "../graphics/railwayLineGraphics.mjs"
import { decToHex } from "../utils/decToHex.mjs"


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
    

    let line = game.railwayLines[game.selectedRailwayLine]
    console.log(line)

    let segment = {}
    if(!checkIfSegmentExists(line, firstStationPosition, secondStationPosition)){
        segment.firstStation = firstStationPosition
        segment.secondStation = secondStationPosition
        segment.line = game.selectedRailwayLine
        line.stations.push(firstStationPosition)
        line.stations.push(secondStationPosition)
        line.stations = deleteDuplicateStationPositions(line.stations)
        console.log("created line segment. line stations: " , line.stations)
        try{
            segment.lines = []
            segment = addRailwaySegmentGraphics(game, segment, firstStationPosition, secondStationPosition)
            line.segments.push(segment)
            //add lines to the railwaystations in tiledata if the line is not already connected to the station
            if(game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation.lines.includes(game.selectedRailwayLine) == false){
                game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation.lines.push(game.selectedRailwayLine)
            }
            if(game.tileData[secondStationPosition.x][secondStationPosition.y].railwayStation.lines.includes(game.selectedRailwayLine) == false){
                game.tileData[secondStationPosition.x][secondStationPosition.y].railwayStation.lines.push(game.selectedRailwayLine)
            }
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
function selectRailwayLine(game, firstStationPosition){
    if(game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation != null){
        let station = game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation
        if (station.lines.length == 0){
            game.selectedRailwayLine = game.railwayLines.length
            station.lines.push(game.selectedRailwayLine)
        }
        else{
            game.selectedRailwayLine = station.lines[0]
        }
    }
    console.log("selected line: ", game.selectedRailwayLine)
}
let lineConstruction = false
let firstStationPosition = null
let secondStationPosition = null
export function railwayLineConstruction(game){
    if (game.railwayLines.length ==game.selectedRailwayLine){
        game.railwayLines.push(new railwayLine(game.railwayLineColors[game.selectedRailwayLine],game.selectedRailwayLine))
    }
    if (game.mouse.justDown && game.isTilemapClicked){
        if (firstStationPosition == null && selectRailwayStation(game) != null){
            firstStationPosition = selectRailwayStation(game)
            selectRailwayLine(game, firstStationPosition)
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
    //temporary uninitialized lines to make them accessible
    game.railwayLines = game.loadedGameData.railwayLines
    for(let i = 0; i < game.loadedGameData.railwayLines.length; i++){
        let line = game.loadedGameData.railwayLines[i]
        let newLine = new railwayLine(line.color, line.id)
        newLine.stations = line.stations
        for(let segment of line.segments){
            let newSegment = {}
            newSegment.firstStation = segment.firstStation
            newSegment.secondStation = segment.secondStation
            newSegment.lines = []
            newSegment.line = i
            newSegment = addRailwaySegmentGraphics(game, newSegment, segment.firstStation, segment.secondStation)
            newLine.segments.push(newSegment)
        }
        //replacing the uninitialized lines with the correct ones
        game.railwayLines[i] = newLine
    }
    console.log(game.railwayLines)
}

