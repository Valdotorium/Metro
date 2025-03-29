import {getUniqueStationsFromSegments, placeLineSegment} from "./railwayConstruction.mjs"

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

function removeStationDependencies(game, stationPosition){
    //TODO: #20 remove all segments of line from station on or connect neighboring stations that belong to the same line with a new segment
    //check if station is in a line, if yes, try to redirect the line to two neighboring stations in the line. If the station is at the end of a line, remove the segment.
    for (let i = 0; i < game.tileData[stationPosition.x][stationPosition.y].railwayStation.lines.length; i++){
        let lineIndex = game.tileData[stationPosition.x][stationPosition.y].railwayStation.lines[i]
        let line = game.railwayLines[lineIndex]
        console.log("line ", line, " connects to deleted station")

        //refresh line stations
        line.stations = getUniqueStationsFromSegments(line)
        //TODO: #21 remove lines that do not connect anymore from stations in tileData
        //new concept: only allow the user to remove stations without lines. instead implement removing lines from stations like in mini metro
        game.railwayLines[lineIndex] = line
        console.log("line after segment deletion: ", line)
    }
}

export function clearTile(game){
    let mousePosition = game.currentHoveredTileIndexes
    console.log(game.tileData[mousePosition.x][mousePosition.y].railwayStation)

    //removing railway stations
    if(game.tileData[mousePosition.x][mousePosition.y].railwayStation != null && game.mouse.justDown){
        if(game.tileData[mousePosition.x][mousePosition.y].railwayStation.lines.length == 0){
            game.tileData[mousePosition.x][mousePosition.y].railwayStation.image.destroy()
            game.tileData[mousePosition.x][mousePosition.y].railwayStation = null
        }
        //removeStationDependencies(game, mousePosition)
    }
}