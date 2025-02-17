
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
