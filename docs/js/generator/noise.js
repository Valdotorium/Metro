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

export function generateZoominNoise(targetSize, smoothness){
    let baseNoise = generateRandomNoise((targetSize / smoothness) + 1);
    let zoominNoise = [];
    for(let i = 0; i < targetSize; i++){
        zoominNoise[i] = [];
        for(let j = 0; j < targetSize; j++){
            let x = i / smoothness + 0.001;
            let y = j / smoothness + 0.001;
            //calculaate weights with real distance (sprt(dx**2+dy**2)) instead of manhattan distance
            const weightToTopLeftInt = (1.5 - Math.sqrt((x - Math.floor(x))**2 + (y - Math.floor(y))**2)) / 4
            const weightToTopRightInt = (1.5 - Math.sqrt((x - Math.ceil(x))**2 + (y - Math.floor(y))**2)) / 4
            const weightToBottomLeftInt = (1.5- Math.sqrt((x - Math.floor(x))**2 + (y - Math.ceil(y))**2)) / 4
            const weightToBottomRightInt = (1.5 - Math.sqrt((x - Math.ceil(x))**2 + (y - Math.ceil(y))**2)) / 4

            const finalValue = (baseNoise[Math.floor(x)][Math.floor(y)] * weightToTopLeftInt + 
                                baseNoise[Math.ceil(x)][Math.floor(y)] * weightToTopRightInt +
                                baseNoise[Math.floor(x)][Math.ceil(y)] * weightToBottomLeftInt + 
                                baseNoise[Math.ceil(x)][Math.ceil(y)] * weightToBottomRightInt)
            zoominNoise[i][j] = finalValue;
            //log important calculation data
            console.log(`x: ${x}, y: ${y}, weightTopLeftInt: ${weightToTopLeftInt}, weightTopRightInt: ${weightToTopRightInt}, weightBottomLeftInt: ${weightToBottomLeftInt}, weightBottomRightInt: ${weightToBottomRightInt}, finalValue: ${finalValue}`)

        }
    }
    console.log(baseNoise)
    console.log(zoominNoise)
    return zoominNoise;
}