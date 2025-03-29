import { placeRailwayStation } from "../simulation/railwayStation.mjs"
import { railwayLine } from "../simulation/railwayLine.mjs"
import { addRailwaySegmentGraphics, deleteRailwayConstructionGraphics, railwayLineDragging } from "../graphics/railwayLineGraphics.mjs"

//THIS FILE IS RESPONSIBLE FOR MANAGING THE CONSTRUCTION OF RAILWAYS
//THE RAILWAY STATION AND LINE DEFINITIONS ARE IN THE SIMULATION FOLDER

//definitions:
//a railway line is a data structure holding color, id, segments and stations of a line (and probably later trains)
//railway lines are stored in the game object

//a railway station is a data structure holding the position of the station and the lines that are connected to it
//railway stations are stored as a property in tileData

//a railway segment is a data structure holding the first and second station of a segment and the line it belongs to,
//and the graphics that make up the connection between the two stations connected with the segment. (Trains travel on segments?)
//railway segments are stored in the railway lines, and because they need graphics, they need to be re-initialized everytime the game is loaded

//STATIONS
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
export function railwayStationConstruction(game){
    if (game.mouse.justDown && game.isTilemapClicked){
        placeRailwayStation(game)
    }
}

//LINES & SEGMENTS
function deleteDuplicateStationPositions(stations){
    //the positions are objects with a x and y value
    //filter out elements with the same x and y values, so there are only unique elements left
    let uniqueStations = stations.filter((station, index, self) =>
        index === self.findIndex((t) => (
            t.x === station.x && t.y === station.y
        ))
    )
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

function insertLineSegment(game, line, segment, ignorePlacementRules){
    //insert the new segment in the correct position, so the sagments stay ordered

    //check if a segment exists in the line
    if (line.segments.length == 0){
        //jjust push the segment without any further checks
        line.segments.push(segment)
        return true
    }

    //check if the segment should be placed in fromt of the first segment of the line
    if (JSON.stringify(segment.firstStation) == JSON.stringify(line.segments[0].firstStation)){
        line.segments.unshift(segment)
        //invert the segments stations
        let temp = segment.firstStation
        segment.firstStation = segment.secondStation
        segment.secondStation = temp
        console.log("inserted segment at the beginning")
        return true
    } else if (JSON.stringify(segment.firstStation) == JSON.stringify(line.segments[line.segments.length - 1].secondStation)){
        //check if the segment should be placed at the end of the line
        line.segments.push(segment)
        console.log("inserted segment at the end")
        return true
    } else {
        //if the segment is not placed at the beginning or end, it is invalid
        console.log("segment placement invalid")
        //except if this is true, which happens when the segment is a reroute when a station is deleted
        if (ignorePlacementRules){
            console.log("ignoring placement rules...")
            for(let j = 0; j < line.segments.length - 1; j++){
                //segment is not the first and not the last segment in line
                if (JSON.stringify(segment.firstStation) == JSON.stringify(line.segments[j].secondStation) && JSON.stringify(segment.secondStation) == JSON.stringify(line.segments[j + 1].firstStation)){
                    line.segments.splice(j + 1, 0, segment)
                    console.log("inserted segment in index: " + (j + 1))
                    return true
                } 
                //case: segment is at beginning of line
                else if(JSON.stringify(segment.secondStation) == JSON.stringify(line.segments[0].firstStation) ){
                    line.segments.splice(0, 0, segment)
                    console.log("inserted segment in index: " + 0)
                    return true
                }
                //case: segment is at end of line
                else if(JSON.stringify(segment.firstStation) == JSON.stringify(line.segments[line.segments.length - 1].secondStation) ){
                    line.segments.push(segment)
                    console.log("inserted segment in index: " + line.segments.length)
                    return true
                }
            }
        }
        return false
    }
}

export function placeLineSegment(game, line, firstStationPosition, secondStationPosition, ignorePlacementRules){
    //place a new segment on a line and initialize it
    //the line the segment belongs to
    console.log(line)
    let segment = {}
    //if the segment does not exist yet, add the stations to the line and delete them again if they are duplicates
    if(!checkIfSegmentExists(line, firstStationPosition, secondStationPosition)){
        segment.firstStation = firstStationPosition
        segment.secondStation = secondStationPosition
        segment.line = line.id

        //to keep the segments ordered, we need to add the new segment at a specific point in the list
        let segmentPlacementIsValid = insertLineSegment(game, line, segment,ignorePlacementRules)
        if(segmentPlacementIsValid == true || ignorePlacementRules == true){
            line.stations.push(firstStationPosition)
            line.stations.push(secondStationPosition)
            line.stations = deleteDuplicateStationPositions(line.stations)
            //add the segments graphics to the game
            segment.lines = []
            segment = addRailwaySegmentGraphics(game, segment, firstStationPosition, secondStationPosition)
            //add the line to the railwaystations in tiledata if the line is not already connected to the station
            if(game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation.lines.includes(line.id) == false){
                game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation.lines.push(line.id)
            }
            if(game.tileData[secondStationPosition.x][secondStationPosition.y].railwayStation.lines.includes(line.id) == false){
                game.tileData[secondStationPosition.x][secondStationPosition.y].railwayStation.lines.push(line.id)
            }
        }

    } else {
        console.log("segment already exists", firstStationPosition, secondStationPosition)
    }
}
function selectRailwayLine(game, firstStationPosition){

    if(game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation != null){
        let station = game.tileData[firstStationPosition.x][firstStationPosition.y].railwayStation
        if (station.lines.length == 0){
            //if there is now line at the station, create a new one
            game.selectedRailwayLine = game.railwayLines.length
            station.lines.push(game.selectedRailwayLine)
        }
        else{
            //choose the first line from the station
            game.selectedRailwayLine = station.lines[0]
        }
    }
    console.log("selected line: ", game.selectedRailwayLine)
}
let lineConstruction = false
let firstStationPosition = null
let secondStationPosition = null
//railway line construction manager, calling the other functions
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
            placeLineSegment(game,game.railwayLines[game.selectedRailwayLine], firstStationPosition, secondStationPosition)
            console.log("created segment, line is now: ", game.railwayLines[game.selectedRailwayLine])
            
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
            newSegment = addRailwaySegmentGraphics(game, newSegment, segment.firstStation, segment.secondStation, false)
            newLine.segments.push(newSegment)
        }
        //replacing the uninitialized lines with the correct ones
        game.railwayLines[i] = newLine
    }
    console.log(game.railwayLines)
}

