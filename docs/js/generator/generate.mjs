import { generateSimpleTilemap } from "./simpleTerrain.mjs"
import { generateComplexTilemap, generateComplexTilemapWithBiomes } from "./complexTerrain.mjs"
import { generateCoastTilemap } from "./coastTerrain.mjs";

export function Tilemap(generator, size){
    //generating a tilemap with the given generator and size
    let map;
    if(generator == "SIMPLE"){
        map = generateSimpleTilemap(size, 10)
    }
    if(generator == "BIOMES"){
        //generate a complex terrain map here

        map = generateComplexTilemapWithBiomes(size)
    } else if(generator == "DEFAULT"){
        map = generateComplexTilemap(size)
    } else if(generator == "COAST"){
        map = generateCoastTilemap(size)
    }
    return map
}