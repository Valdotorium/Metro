import { generatePerlinNoise } from "./noise.js";
import { interpolateBaseNoise } from "./noise.js";

function generateCoastlineNoise(){
    //generate a random noise that represents the coastline
    let base
    let a = Math.random() * 0.15 + 0.85
    let b = Math.random() * 0.2 + 0.5
    let c = Math.random() * 0.08+ 0.4
    let d = Math.random() * 0.1 + 0.01
    let flip = Math.round(Math.random())
    if(flip == 1){
        base = [[a,a,a,a],[b,b,b,b],[c,c,c,c],[d,d,d,d]]
    }else{
        base = [[a,b,c,d],[a,b,c,d],[a,b,c,d],[a,b,c,d]]
    }
    flip = Math.round(Math.random())

    if(flip==1){
        //switch rows and columns of base
        let newBase = []
        for(let i = 0; i < 4; i++){
            newBase[i] = []
            for(let j = 0; j < 4; j++){
                newBase[i][j] = base[j][i]
            }
        }
        base = newBase
    }
    return base

}
export function generateCoastTilemap(size){
    //detail factor of the terrain, lower the higher the target size is
    let detailFactor = 0.5 + 0.5 / (size / 75)
    let islandNoise;


    //generate the noise that roughly sets the coastline
    let baseNoise = interpolateBaseNoise(size , Math.ceil(size / 3), generateCoastlineNoise())
    console.log(baseNoise)

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
                let noiseValue = (baseNoise[i][j] * 0.77 + complexNoise[i][j] * 0.12 + shuffleNoise[i][j] * 0.11)
                weightedNoise[i][j] = noiseValue; 

        } 
    }

    //translate the values between 0 and 1 to tile types. see tilemapIndexes.txt for more info
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
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
    }
    return weightedNoise;
}
