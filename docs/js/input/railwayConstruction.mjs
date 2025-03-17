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
    //get all unique stations from the segments of a line
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

function orderLineSegments(line){
    //order the segments of a line so that they are in the right order
    let orderedSegments = []
    
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
    //the line the segment belongs to
    let line = game.railwayLines[game.selectedRailwayLine]
    console.log(line)

    let segment = {}
    //if the segment does not exist yet, add the stations to the line and delete them again if they are duplicates
    if(!checkIfSegmentExists(line, firstStationPosition, secondStationPosition)){
        segment.firstStation = firstStationPosition
        segment.secondStation = secondStationPosition
        segment.line = game.selectedRailwayLine
        line.stations.push(firstStationPosition)
        line.stations.push(secondStationPosition)
        line.stations = deleteDuplicateStationPositions(line.stations)
        console.log("created line segment. line stations: " , line.stations)
        //add the segments graphics to the game
        segment.lines = []
        segment = addRailwaySegmentGraphics(game, segment, firstStationPosition, secondStationPosition)
        line.segments.push(segment)
        //add the line to the railwaystations in tiledata if the line is not already connected to the station
        if(game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation.lines.includes(game.selectedRailwayLine) == false){
            game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation.lines.push(game.selectedRailwayLine)
        }
        if(game.tileData[secondStationPosition.x][secondStationPosition.y].railwayStation.lines.includes(game.selectedRailwayLine) == false){
            game.tileData[secondStationPosition.x][secondStationPosition.y].railwayStation.lines.push(game.selectedRailwayLine)
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
    //if the user is creating a new line, do that
    if (game.railwayLines.length ==game.selectedRailwayLine){
        game.railwayLines.push(new railwayLine(game.railwayLineColors[game.selectedRailwayLine],game.selectedRailwayLine))
    }
    if (game.mouse.justDown && game.isTilemapClicked){
        //select the first station
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
        //when both stations are selected, add the railway line segment
        if(firstStationPosition != null && secondStationPosition != null){
            placeLineSegment(game, firstStationPosition, secondStationPosition)
            //order the segments of the line between the line ends
            game.railwayLines[game.selectedRailwayLine] = orderLineSegments(game.railwayLines[game.selectedRailwayLine])
            secondStationPosition = null
            firstStationPosition = null
            lineConstruction = false
            deleteRailwayConstructionGraphics(game)
        }
    }
    //draw the preview of the line segment before the second station is selected
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

