import { generateRandomNoise } from "./noise.js";
export function generateSimpleTilemap(targetSize, smoothness){

    //pure smoothed noise terrain
    let baseNoise = generateRandomNoise((targetSize / smoothness) + 3);
    let zoominNoise = [];
    for(let i = 0; i < targetSize; i++){
        zoominNoise[i] = [];
        for(let j = 0; j < targetSize; j++){
            let x = i / smoothness
            let y = j / smoothness
            let x0 = Math.floor(x)
            let x1 = x0 + 1
            let y0 = Math.floor(y)
            let y1 = y0 + 1

            let p1 = Phaser.Math.Interpolation.SmoothStep(x - x0, baseNoise[x0][y0], baseNoise[x1][y0])
            let p2 = Phaser.Math.Interpolation.SmoothStep(x - x0, baseNoise[x0][y1], baseNoise[x1][y1])

            let noiseValue = Phaser.Math.Interpolation.SmoothStep(y - y0, p1, p2)
            zoominNoise[i][j] = noiseValue;
        } 
    }
    console.log(baseNoise)
    console.log(zoominNoise)

    //translate the values between 0 and 1 to tile types. see tilemapIndexxes.txt for more info
    for(let i = 0; i < targetSize; i++){
        for(let j = 0; j < targetSize; j++){
            if(zoominNoise[i][j] < 0.4){
                //water
                zoominNoise[i][j] = 22
            }else if(zoominNoise[i][j] < 0.48){
                //plains
                zoominNoise[i][j] = 2
            } else if(zoominNoise[i][j] < 0.7){
                //desert
                zoominNoise[i][j] = 0
            } else {
                //forest
                zoominNoise[i][j] = 6
            }
        }
    }
    return zoominNoise;
}