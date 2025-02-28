import { generateSimpleTilemap } from "./simpleTerrain.mjs"
import { generateComplexTilemap } from "./complexTerrain.mjs"


export function Tilemap(generator, size){
    let map;
    if(generator == "simple"){
        map = generateSimpleTilemap(size, 10)
    }
    if(generator == "complex"){
        //generate a complex terrain map here
        map = generateComplexTilemap(size)
    }
    return map

}