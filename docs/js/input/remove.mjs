import {getUniqueStationsFromSegments, placeLineSegment} from "./railwayConstruction.mjs"



export function removeLineFromAllStations(game, line, lineIndex){
    //remove the line from all stations
    for (let station of line.stations){
        let stationObject = game.tileData[station.x][station.y].railwayStation
        if(stationObject != null){
            console.log("removed line ", lineIndex, " from station ", station.x, ",", station.y)
            let index = stationObject.lines.indexOf(lineIndex)
            stationObject.lines.splice(index, 1)
            game.tileData[station.x][station.y].railwayStation = stationObject
        }

    }
}
export function writeLineToStations(game, line, lineIndex){
    //write the line to all stations
    for (let station of line.stations){
        let stationObject = game.tileData[station.x][station.y].railwayStation
        if(stationObject != null){
            stationObject.lines.push(lineIndex)
            game.tileData[station.x][station.y].railwayStation = stationObject
        }
    }
}
export function removeLineSegment(game, line, segmentIndex){
    //remove the segments graphics
    for(let image of line.segments[segmentIndex].lines){
        image.destroy()
    }
    //remove the segment from the line
    line.segments.splice(segmentIndex, 1)
    //remove the segment from the graphics


}

export function checkForLineEnds(line, stationPosition){
    let lastSegmentIndex = line.segments.length - 1
    if (JSON.stringify(line.segments[0].firstStation) == JSON.stringify(stationPosition)){
        console.log("station is at beginning of line ", line.id)
        return "start"
    }
    else if (JSON.stringify(line.segments[lastSegmentIndex].secondStation) == JSON.stringify(stationPosition)){
        console.log("station is at end of line ", line.id)
        return "end"
    }
    else {
        return false
    }
}

function rerouteLineAroundStation(game, line, stationPosition){
    //removing all segments connected to the stations
    for(let j = 0; j < line.segments.length - 1; j++){
        let segment = line.segments[j]

        if (JSON.stringify(segment.secondStation) == JSON.stringify(stationPosition)){
            //remove the two neighboring segments from the line
            let newSegmentSecondStation = line.segments[j+1].secondStation
            let newSegmentFirstStation = segment.firstStation
            removeLineSegment(game, line, j)
            removeLineSegment(game, line, j)
            placeLineSegment(game, line, newSegmentFirstStation, newSegmentSecondStation, true)
        }
    }
}
function removeStationDependencies(game, stationPosition){
    //TODO: #20 remove all segments of line from station on or connect neighboring stations that belong to the same line with a new segment
    //check if station is in a line, if yes, try to redirect the line to two neighboring stations in the line. If the station is at the end of a line, remove the segment.
    for (let i = 0; i < game.tileData[stationPosition.x][stationPosition.y].railwayStation.lines.length; i++){
        let lineIndex = game.tileData[stationPosition.x][stationPosition.y].railwayStation.lines[i]
        let line = game.railwayLines[lineIndex]
        console.log("line ", line, " connects to deleted station")

        let isTerminalStation = checkForLineEnds(line, stationPosition)
        if(isTerminalStation == "start"){
            removeLineSegment(game, line, 0)

        }
        else if(isTerminalStation == "end"){
            removeLineSegment(game, line, line.segments.length - 1)
        }
        else {
            console.log("station is in the middle of a line")
            //get the segment indexes that neighbor the station
            rerouteLineAroundStation(game, line, stationPosition)
            
        }
        //refresh line stations
        line.stations = getUniqueStationsFromSegments(line)
        //TODO: #21 remove lines that do not connect anymore from stations in tileData
        //remove the line from all stations
        //console.log(game.railwayLines[lineIndex])
        //removeLineFromAllStations(game, game.railwayLines[lineIndex], lineIndex)
        //write the line to all stations
        //writeLineToStations(game, line, lineIndex)


        game.railwayLines[lineIndex] = line
        console.log("line after segment deletion: ", line)
    }
}

export function clearTile(game){
    let mousePosition = game.currentHoveredTileIndexes
    console.log(game.tileData[mousePosition.x][mousePosition.y].railwayStation)

    //removing railway stations
    if(game.tileData[mousePosition.x][mousePosition.y].railwayStation != null && game.mouse.justDown){
        removeStationDependencies(game, mousePosition)
        game.tileData[mousePosition.x][mousePosition.y].railwayStation.image.destroy()
        game.tileData[mousePosition.x][mousePosition.y].railwayStation = null
    }
}