import {getUniqueStationsFromSegments} from "./railwayConstruction.mjs"


export function removeLineFromAllStations(game, line, lineIndex){
    //remove the line from all stations
    for (let station of line.stations){
        let stationObject = game.tileData[station.x][station.y].railwayStation
        if(stationObject != null){
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
export function removeSegments(game, line, segmentIndex){

}

export function checkForLineEnds(line, stationPosition){
    if (JSON.stringify(line.segments[0].firstStation) == JSON.stringify(stationPosition)){
        console.log("station is at beginning of line ", line.id)
    }
    let lastSegmentIndex = line.segments.length - 1
    if (JSON.stringify(line.segments[lastSegmentIndex].secondStation) == JSON.stringify(stationPosition)){
        console.log("station is at end of line ", line.id)
    }
}

function removeStationDependencies(game, stationPosition){
    //TODO: #20 remove all segments of line from station on or connect neighboring stations that belong to the same line with a new segment
    //check if station is in a line, if yes, try to redirect the line to two neighboring stations in the line. If the station is at the end of a line, remove the segment.
    for (let i = 0; i < game.tileData[stationPosition.x][stationPosition.y].railwayStation.lines.length; i++){
        let lineIndex = game.tileData[stationPosition.x][stationPosition.y].railwayStation.lines[i]
        let line = game.railwayLines[lineIndex]
        console.log("line ", line.id, " connects to deleted station")
        //removing all segments connected to the stations
        for(let j = 0; j < line.segments.length; j++){
            let segment = line.segments[j]
            checkForLineEnds(line, stationPosition)

            if (JSON.stringify(segment.firstStation) == JSON.stringify(stationPosition)){
                //check if station is in a line, if yes, try to redirect the line to two neighboring stations in the line. If the station is at the end of a line, remove the segment. 
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
        removeStationDependencies(game, mousePosition)
        game.tileData[mousePosition.x][mousePosition.y].railwayStation.image.destroy()
        game.tileData[mousePosition.x][mousePosition.y].railwayStation = null
    }
}