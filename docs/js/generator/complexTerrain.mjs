
import { generatePerlinNoise } from "./noise.js";

export function generateComplexTilemap(size){
    //detail factor of the terrain, lower the higher the target size is
    let detailFactor = 0.5 + 0.5 / (size / 75)
    let islandNoise;

    //very strong and upscaled noise for large maps
    if(size > 140){
        islandNoise = generatePerlinNoise(size, Math.round(50 / detailFactor))
    }

    //generate the noise that roughly sets the coastline
    let baseNoise = generatePerlinNoise(size,Math.round(20 / detailFactor))

    //generate more complex noise
    let complexNoise = generatePerlinNoise(size, Math.round(8 / detailFactor))

    //even more complex noise
    let shuffleNoise = generatePerlinNoise(size, Math.round(3 / detailFactor))

    //noise for specific tile types
    let BaseForestNoise = generatePerlinNoise(size, Math.round(20 / detailFactor))
    let forestNoise = generatePerlinNoise(size, Math.round(3 / detailFactor))
    let sandNoise = generatePerlinNoise(size, Math.round(8 / detailFactor))
    let mountainNoise = generatePerlinNoise(size, Math.round(3 / detailFactor))
    let mountainBaseNoise = generatePerlinNoise(size, Math.round(20 / detailFactor))
    let iceNoise = generatePerlinNoise(size, Math.round( 8 / detailFactor))

    //for the three biomes
    let temperatureNoise = generatePerlinNoise(size, Math.round(40 / detailFactor))
    let temperatureDetailNoise = generatePerlinNoise(size, Math.round(8 / detailFactor))

    //overlay the temperature noises
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
               temperatureNoise[i][j] = temperatureNoise[i][j] * 0.8 + temperatureDetailNoise[i][j] * 0.2
        }
    }

    //overlay the mountain noises
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
               mountainNoise[i][j] = mountainBaseNoise[i][j] * 0.55 + mountainNoise[i][j] * 0.45
        }
    }
    //overlay the forest noises
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            forestNoise[i][j] = BaseForestNoise[i][j] * 0.7 + forestNoise[i][j] * 0.3
        }
    }

    //overlay the noises, weighted
    let weightedNoise = [];
    for(let i = 0; i < size; i++){
        weightedNoise[i] = [];
        for(let j = 0; j < size; j++){
            if (size <= 140){
                let noiseValue = (baseNoise[i][j] * 0.77 + complexNoise[i][j] * 0.12 + shuffleNoise[i][j] * 0.11)
                weightedNoise[i][j] = noiseValue;
            } else{
                let noiseValue = (islandNoise[i][j] * 0.52 + baseNoise[i][j] * 0.3 + complexNoise[i][j] * 0.12 + shuffleNoise[i][j] * 0.11)
                weightedNoise[i][j] = noiseValue;  
            }

        } 
    }

    //translate the values between 0 and 1 to tile types. see tilemapIndexes.txt for more info
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            //for cold biomes
            if(temperatureNoise[i][j] < 0.25){
                if(weightedNoise[i][j] < 0.32){
                    if(iceNoise[i][j] < 0.6 && shuffleNoise[i][j] < 0.5){
                        //water (deep)
                        weightedNoise[i][j] = 23
                    } else {
                        weightedNoise[i][j] = 3
                    }

                } else if(weightedNoise[i][j] < 0.42){
                    if(iceNoise[i][j] < 0.7&& shuffleNoise[i][j] < 0.5){
                        //water (deep)
                        weightedNoise[i][j] = 22
                    } else {
                        weightedNoise[i][j] = 3
                    }
                } else if(weightedNoise[i][j] < 0.48 && sandNoise[i][j] > 0.5){
                    //plains
                    weightedNoise[i][j] = 0
                }else if(weightedNoise[i][j] < 0.45 && forestNoise[i][j] > 0.7){
                    //forest
                    weightedNoise[i][j] = 6
                }else if(weightedNoise[i][j] < 0.46 && sandNoise[i][j] < 0.4 && forestNoise[i][j] < 0.45){
                    //wetlands
                    weightedNoise[i][j] = 8
                }else if(weightedNoise[i][j] < 0.55 && forestNoise[i][j] > 0.4){
                    //forest (cold)
                    weightedNoise[i][j] = 21
                }else if(weightedNoise[i][j] < 0.725 && forestNoise[i][j] > 0.7){
                    //forest (cold)
                    weightedNoise[i][j] = 21
                }else if(weightedNoise[i][j] < 0.6 && forestNoise[i][j] < 0.45 && sandNoise[i][j] < 0.4){
                    //field
                    weightedNoise[i][j] = 1
                }else if(weightedNoise[i][j] < 0.775 && forestNoise[i][j] < 0.25){
                    //field
                    weightedNoise[i][j] = 1
                }else if(weightedNoise[i][j] < 0.725){
                    //plains or ice
                    if(iceNoise[i][j] < 0.6){
                        weightedNoise[i][j] = 0
                    }
                    else {
                        weightedNoise[i][j] = 3
                    }
                } else if(weightedNoise[i][j] > 0.87 && mountainNoise[i][j] > 0.45){
                    //mountains snowcaps
                    weightedNoise[i][j] = 3
                } else if(mountainNoise[i][j] > 0.35){
                    //mountains
                    weightedNoise[i][j] = 4
                }  else {
                    //ice
                    weightedNoise[i][j] = 3
                }
            }

            //for moderate biomes
            else if(temperatureNoise[i][j] <= 0.725){
                if(weightedNoise[i][j] < 0.32){
                    //water
                    weightedNoise[i][j] = 23
                } else if(weightedNoise[i][j] < 0.42){
                    //water
                    weightedNoise[i][j] = 22
                } else if(weightedNoise[i][j] < 0.48 && sandNoise[i][j] > 0.5){
                    //beach
                    weightedNoise[i][j] = 2
                }else if(weightedNoise[i][j] < 0.45 && forestNoise[i][j] > 0.75){
                    //swamp
                    weightedNoise[i][j] = 7
                }else if(weightedNoise[i][j] < 0.46 && sandNoise[i][j] < 0.4 && forestNoise[i][j] < 0.45){
                    //wetlands
                    weightedNoise[i][j] = 8
                }else if(weightedNoise[i][j] < 0.55 && forestNoise[i][j] > 0.5){
                    //forest
                    weightedNoise[i][j] = 6
                }else if(weightedNoise[i][j] < 0.725 && forestNoise[i][j] > 0.65){
                    //forest
                    weightedNoise[i][j] = 6
                }else if(weightedNoise[i][j] < 0.6 && forestNoise[i][j] < 0.45 && sandNoise[i][j] < 0.4){
                    //field
                    weightedNoise[i][j] = 1
                }else if(weightedNoise[i][j] < 0.775 && forestNoise[i][j] < 0.25){
                    //field
                    weightedNoise[i][j] = 1
                }else if(weightedNoise[i][j] < 0.725){
                    //plains
                    weightedNoise[i][j] = 0
                } else if(weightedNoise[i][j] < 0.775){
                    //forest (lower)
                    weightedNoise[i][j] = 6
                } else if(weightedNoise[i][j] > 0.87 && mountainNoise[i][j] > 0.5){
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
            //for warm biomes
            else if(temperatureNoise[i][j] > 0.725){
                if(weightedNoise[i][j] < 0.32){
                    //water
                    weightedNoise[i][j] = 23
                } else if(weightedNoise[i][j] < 0.42){
                    //water
                    weightedNoise[i][j] = 22
                } else if(weightedNoise[i][j] < 0.5 && sandNoise[i][j] > 0.5){
                    //beach (wider)
                    weightedNoise[i][j] = 2
                }else if(weightedNoise[i][j] < 0.45 && forestNoise[i][j] > 0.65){
                    //swamp
                    weightedNoise[i][j] = 7
                }else if(weightedNoise[i][j] < 0.55 && forestNoise[i][j] > 0.75){
                    //wetlands
                    weightedNoise[i][j] = 8
                }else if(weightedNoise[i][j] < 0.6 && forestNoise[i][j] < 0.5 && sandNoise[i][j] < 0.4&& shuffleNoise[i][j] < 0.5){
                    //field
                    weightedNoise[i][j] = 1
                }else if(weightedNoise[i][j] < 0.6 && forestNoise[i][j] > 0.65 && sandNoise[i][j] < 0.45 && shuffleNoise[i][j] < 0.2){
                    //oasis
                    weightedNoise[i][j] = 7
                }else if(weightedNoise[i][j] < 0.675){
                    //plains or desert
                    if(sandNoise[i][j] < 0.3){
                        weightedNoise[i][j] = 0
                    } else {
                        weightedNoise[i][j] = 2
                    }
                   
                }else if(weightedNoise[i][j] < 0.675){
                    //desert or mountain (desert)
                    if(mountainNoise[i][j] < 0.5){
                        weightedNoise[i][j] = 2
                    } else {
                        weightedNoise[i][j] = 5
                    }
                   
                }  else if(mountainNoise[i][j] > 0.375){
                    //mountains (desert)
                    weightedNoise[i][j] = 5
                }  else {
                    //forest
                    weightedNoise[i][j] = 2
                }
            }

        }
    }
    return weightedNoise;
}