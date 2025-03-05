import { generateSimpleTilemap } from "./simpleTerrain.mjs"
import { generateComplexTilemap, generateComplexTilemapWithBiomes } from "./complexTerrain.mjs"


export function Tilemap(generator, size){
    let map;
    if(generator == "simple"){
        map = generateSimpleTilemap(size, 10)
    }
    if(generator == "complexBiomes"){
        //generate a complex terrain map here

        map = generateComplexTilemapWithBiomes(size)
    } else if(generator == "complex"){
        map = generateComplexTilemap(size)
    }
    return map

}