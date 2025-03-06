
export function generateRandomNoise(size){
    //generate a two dimensional array containing random numbers
    let noise = [];
    for(let i = 0; i < size; i++){
        noise[i] = [];
        for(let j = 0; j < size; j++){
            noise[i][j] = Math.random();
        }
    }
    return noise;
}

export function generatePerlinNoise(targetSize, smoothness){

    //perlin noise function used for generating terrain
    //zoominNoise = perlin noise
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
    return zoominNoise;


}