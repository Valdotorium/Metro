export function railwayLineDragging(game, firstStationPosition){
    let sceneFirstStationPosition = game.tileMap.tileToWorldXY(firstStationPosition.x, firstStationPosition.y)
    let mousePosition = game.currentHoveredTileIndexes
    let sceneMousePosition = game.tileMap.tileToWorldXY(mousePosition.x, mousePosition.y)

    //determine on which side of the first station the mouse is, in negative or positive x and y direction
    let xDirection = Phaser.Math.Clamp(sceneMousePosition.x - sceneFirstStationPosition.x, -1, 1)
    let yDirection = Phaser.Math.Clamp(sceneMousePosition.y - sceneFirstStationPosition.y, -1, 1)
    let circleObj

    deleteRailwayConstructionGraphics(game)
    //connecting the two points at mouse and the station with a diagonal and a horizontal/vertical line
    let smallestDifference = Math.abs(sceneMousePosition.x - sceneFirstStationPosition.x)
    if (Math.abs(sceneMousePosition.y - sceneFirstStationPosition.y) < smallestDifference){
        smallestDifference = Math.abs(sceneMousePosition.y - sceneFirstStationPosition.y)
    }
    //the point where the diagonal line shifts to a verical/horizontal line
    let viaPointPosition = {x: sceneFirstStationPosition.x + smallestDifference * xDirection, y: sceneFirstStationPosition.y + smallestDifference * yDirection}

    let color = game.railwayLineColors[game.selectedRailwayLine]
    circleObj = game.add.circle(viaPointPosition.x + 18, viaPointPosition.y + 18, Math.max(Math.round(game.frame % 60), Math.round(60 - game.frame %60 )) * 0.1 + 1, color).setOrigin(0.5,0.5)
    game.railwayConstructionGraphics.push(circleObj)
    //now add a line between the first station and the via point
    let lineObj
    lineObj = game.add.line(0,0, sceneFirstStationPosition.x + 18, sceneFirstStationPosition.y + 18, viaPointPosition.x + 18, viaPointPosition.y + 18, color).setOrigin(0,0);
    lineObj.setLineWidth(Math.max(Math.round(game.frame % 60), Math.round(60 - game.frame %60 )) * 0.1 + 1)
    game.railwayConstructionGraphics.push(lineObj)
    //and between the via point and the mouse
    lineObj = game.add.line(0,0, viaPointPosition.x + 18, viaPointPosition.y + 18, sceneMousePosition.x + 18, sceneMousePosition.y + 18, color).setOrigin(0);
    //make the line thickness vary with time

    lineObj.setLineWidth(Math.max(Math.round(game.frame % 60), Math.round(60 - game.frame %60 )) * 0.1 + 1)
    game.railwayConstructionGraphics.push(lineObj)

}
export function deleteRailwayConstructionGraphics(game){
    if(game.railwayConstructionGraphics == undefined){
        game.railwayConstructionGraphics = []
    } else{
        for (let graphic of game.railwayConstructionGraphics){
            graphic.destroy()
        }
    }
}

export function addRailwaySegmentGraphics(game,line, firstStationPosition, secondStationPosition){
    //IMPORTANT: line is a line segment here
    //the same as in railwayLineDragging, but mousePosition is replaced with secondStationPosition
    let sceneFirstStationPosition = game.tileMap.tileToWorldXY(firstStationPosition.x, firstStationPosition.y)
    let sceneSecondStationPosition = game.tileMap.tileToWorldXY(secondStationPosition.x, secondStationPosition.y)
    let lineObj

    //determine on which side of the first station the mouse is, in negative or positive x and y direction
    let xDirection = Phaser.Math.Clamp(sceneSecondStationPosition.x - sceneFirstStationPosition.x, -1, 1)
    let yDirection = Phaser.Math.Clamp(sceneSecondStationPosition.y - sceneFirstStationPosition.y, -1, 1)
    let circleObj

    let smallestDifference = Math.abs(sceneSecondStationPosition.x - sceneFirstStationPosition.x)
    if (Math.abs(sceneSecondStationPosition.y - sceneFirstStationPosition.y) < smallestDifference){
        smallestDifference = Math.abs(sceneSecondStationPosition.y - sceneFirstStationPosition.y)
    }
    
    let color = game.railwayLines[line.line].color
    //the point where the diagonal line shifts to a verical/horizontal line
    let viaPointPosition = {x: sceneFirstStationPosition.x + smallestDifference * xDirection, y: sceneFirstStationPosition.y + smallestDifference * yDirection}
    circleObj = game.add.circle(viaPointPosition.x + 13, viaPointPosition.y + 13, 5, color).setOrigin(0)
    line.lines.push(circleObj)
    //now add a line between the first station and the via point
    lineObj = game.add.line(0,0, sceneFirstStationPosition.x + 18, sceneFirstStationPosition.y + 18, viaPointPosition.x + 18, viaPointPosition.y + 18, color).setOrigin(0);
    lineObj.setLineWidth(5);
    line.lines.push(lineObj)
    //and between the via point and the second station
    lineObj = game.add.line(0,0, viaPointPosition.x + 18, viaPointPosition.y + 18, sceneSecondStationPosition.x + 18, sceneSecondStationPosition.y + 18, color).setOrigin(0);
    lineObj.setLineWidth(5);
    line.lines.push(lineObj)

    //line is a line segment
    return line
}
