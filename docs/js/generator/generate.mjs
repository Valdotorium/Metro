import { generateSimpleTilemap } from "./simpleTerrain.mjs"


export function Tilemap(generator, size){
    let map;
    if(generator == "simple"){
        map = generateSimpleTilemap(size, 25)
    }
    return map

}