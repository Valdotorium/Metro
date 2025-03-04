import { generatePerlinNoise } from "../generator/noise.js"
export function setupTileData(game){
    let mapSize = game.tileMapOptions.size
    //make a 2d array with size mapSize of objects with a population parameter 
    let tileData = []
    for(let i = 0; i < mapSize; i++){
        tileData[i] = []
        for(let j = 0; j < mapSize; j++){
            tileData[i][j] = {population: 0}
        }
    }
    //populate tile data with data

    tileData = generatePopulations(game, tileData)

    return tileData
}


function generatePopulations(game, tileData){

    let mapSize = game.tileMapOptions.size
    let detailFactor = 0.75 + 0.25 / (mapSize / 75)
    let populationNoise = generatePerlinNoise
    //generate the noise that roughly sets the coastline
    let baseNoise = generatePerlinNoise(mapSize,Math.round(20 / detailFactor))

    //generate more complex noise
    let complexNoise = generatePerlinNoise(mapSize, Math.round(8 / detailFactor))

    //even more complex noise
    let shuffleNoise = generatePerlinNoise(mapSize, Math.round(3 / detailFactor))
    //overly the noises, weighted
    let weightedNoise = [];
    for(let i = 0; i < mapSize; i++){
        weightedNoise[i] = [];
        for(let j = 0; j < mapSize; j++){
            let noiseValue = (baseNoise[i][j] * 0.6 + complexNoise[i][j] * 0.2 + shuffleNoise[i][j] * 0.2)
            weightedNoise[i][j] = noiseValue;
        } 
    }

    //if tile type is 
    for(let i = 0; i < mapSize; i++){
        for(let j = 0; j < mapSize; j++){
            if(weightedNoise[i][j] > 0.3 && game.generatedTilemap[i][j] == 0){
                //populating plains
                tileData[i][j].population = Math.round(weightedNoise[i][j] * 3)
            } else if(weightedNoise[i][j] > 0.5 && game.generatedTilemap[i][j] == 1){
                //populating fields
                tileData[i][j].population = Math.round(weightedNoise[i][j] * 6) - 1
            } else if(weightedNoise[i][j] > 0.3 && game.generatedTilemap[i][j] == 2){
                //populating beaches
                tileData[i][j].population = Math.round(weightedNoise[i][j] * 3)
            } else if(weightedNoise[i][j] > 0.65 && game.generatedTilemap[i][j] == 6){
                //populating forests
                tileData[i][j].population = Math.round(weightedNoise[i][j] * 5) - 2
            } else if(weightedNoise[i][j] > 0.5 && game.generatedTilemap[i][j] == 8){
                //populating wetlands
                tileData[i][j].population = Math.round(weightedNoise[i][j] * 5) - 1
            } else {
                //populating mountains
                tileData[i][j].population = 0
            }
        } 
    }
    return tileData

}