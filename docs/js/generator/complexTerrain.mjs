
import { generatePerlinNoise } from "./noise.js";

export function generateComplexTilemap(size){
    //generate the noise that roughly sets the coastline
    let baseNoise = generatePerlinNoise(size,25)

    //generate more complex noise
    let complexNoise = generatePerlinNoise(size, 8)

    //even more complex noise
    let shuffleNoise = generatePerlinNoise(size, 3)

    //noise for specific tile types
    let forestNoise = generatePerlinNoise(size, 5)
    let sandNoise = generatePerlinNoise(size, 10)
    let mountainBaseNoise = generatePerlinNoise(size, 3)
    let mountainNoise = generatePerlinNoise(size, 20)

    //overlay the mountain noises
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            if(mountainNoise[i][j] > 0.8){
                mountainNoise[i][j] = mountainBaseNoise[i][j] * 0.4 + mountainNoise[i][j] * 0.6
            }
        }
    }

    //overly the noises, weighted
    let weightedNoise = [];
    for(let i = 0; i < size; i++){
        weightedNoise[i] = [];
        for(let j = 0; j < size; j++){
            let noiseValue = (baseNoise[i][j] * 0.54  + complexNoise[i][j] * 0.39 + shuffleNoise[i][j] * 0.07)
            weightedNoise[i][j] = noiseValue;
        } 
    }

    //translate the values between 0 and 1 to tile types. see tilemapIndexxes.txt for more info
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            if(weightedNoise[i][j] < 0.42){
                //water
                weightedNoise[i][j] = 22
            } else if(weightedNoise[i][j] < 0.48 && sandNoise[i][j] > 0.55){
                //beach
                weightedNoise[i][j] = 2
            }else if(weightedNoise[i][j] < 0.48 && forestNoise[i][j] > 0.75){
                //swamp
                weightedNoise[i][j] = 7
            }else if(weightedNoise[i][j] < 0.44 && sandNoise[i][j] < 0.45 && forestNoise[i][j] < 0.5){
                //wetlands
                weightedNoise[i][j] = 8
            }else if(weightedNoise[i][j] < 0.55 && forestNoise[i][j] > 0.6){
                //forest
                weightedNoise[i][j] = 6
            }else if(weightedNoise[i][j] < 0.725 && forestNoise[i][j] > 0.7){
                //forest
                weightedNoise[i][j] = 6
            }else if(weightedNoise[i][j] < 0.65 && forestNoise[i][j] < 0.25){
                //field
                weightedNoise[i][j] = 1
            }else if(weightedNoise[i][j] < 0.725 && forestNoise[i][j] < 0.1){
                //field
                weightedNoise[i][j] = 1
            }else if(weightedNoise[i][j] < 0.725){
                //plains
                weightedNoise[i][j] = 0
            } else if(weightedNoise[i][j] < 0.76){
                //forest (lower)
                weightedNoise[i][j] = 6
            } else if(weightedNoise[i][j] > 0.85 && mountainNoise[i][j] > 0.525){
                //mountains snowcaps
                weightedNoise[i][j] = 3
            } else if(mountainNoise[i][j] > 0.375){
                //mountains
                weightedNoise[i][j] = 4
            }  else {
                //forest
                weightedNoise[i][j] = 6
            }
        }
    }
    return weightedNoise;
}