import { generateZoominNoise } from "./noise.js";

export function Tilemap(size){
    let noise = generateZoominNoise(size, 10);
    return noise

}