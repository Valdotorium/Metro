import { Tilemap } from "../generator/generate.mjs"
import { setupTileData } from "../simulation/setupTileData.mjs"
import { generateCities, assignCityClasses, loadCityTextInfos } from "../simulation/citymanegment.mjs"
import { makeEmptyTileMap } from "./makeEmptyTilemap.mjs"
import { createLinesFromSaveGame } from "../input/railwayConstruction.mjs"

function setupMainTileMap(scene){
    if (scene.options.loadMap){
        scene.tileMapOptions.size = scene.loadedGameData.tileMap.length
    } 
    //get the tilemap size
    let mapSize = scene.tileMapOptions.size
    console.log(mapSize)
    if (mapSize < 10){ mapSize = 10 }
    if (mapSize > 300){ mapSize = 300 }

    console.log("map size is: ", mapSize)
    //generate a tilemap array with values between 0 and 1
    if (!scene.options.loadMap){
        scene.generatedTilemap =Tilemap(scene.options.terrainGenerator,mapSize)
    } else {
        scene.generatedTilemap = scene.loadedGameData.tileMap
    }
    //draw a blue rectangle behind the tilemap
    scene.add.rectangle(4,4, mapSize * 24, mapSize * 24, 0xb4cee0).setOrigin(0,0).setDepth(-1);

    //switch rows and columns in scene.generatedTilemap and store the rotated tilemap in scene.RotatedGeneratedTilemap, because phaser stores the rows and colums differently
    scene.RotatedGeneratedTilemap = scene.generatedTilemap.map((row, col) => row.map((tile, index) => scene.generatedTilemap[index][col]))

    //tiles sized 8x8 are placed in a 6x6 grid, allowed to overlap 1 px each side
    scene.tileMap = scene.make.tilemap({ data: scene.RotatedGeneratedTilemap, tileWidth: 6, tileHeight: 6, width: mapSize, height: mapSize}).setLayerTileSize(8,8)
    scene.currentTilesetImage = scene.tileMap.addTilesetImage(scene.tilesets[0].name, scene.tilesets[0].name, 8, 8)
    scene.currentTileset = 0
    const layer = scene.tileMap.createLayer(0, scene.tileMap.tilesets[0],0,0);
    scene.scale = 4
    layer.setScale(scene.scale);
    scene.tileMap.layer = layer

    //make tilemap interactive
    scene.currentSelectedTile = {x: 0, y: 0}
    scene.isTilemapClicked = false
    scene.input.on("pointerdown", function(pointer, sceneObject)
    {
        scene.currentSelectedTile = scene.currentHoveredTile
        scene.isTilemapClicked = true
        
    })
    scene.input.on("pointerup", function(pointer, sceneObject)
    {
        scene.isTilemapClicked = false
        
    })

    //configure the camera
    scene.cameras.main.setBounds(-600,-400, layer.width * layer.scale + 1200, layer.height * layer.scale + 800);
    scene.cameras.main.zoom = 2

}
function assignImageTypes(scene){
    //loading cities from savegames
    for(let tileArray of scene.tileData){
        //same for all citydistricts
        let i
        let j
        for(let tile of tileArray){
            i++
            j = 0
            if(tile.railwayStation != null){
                j++
                let imgData = tile.railwayStation.image
                tile.railwayStation.image = scene.add.image(imgData.x , imgData.y , "Station").setScale(imgData.scale.x).setOrigin(imgData.origin.x)
            }
        }

    }
}
function setupOtherTilemaps(scene){
    //setup the tileData array
    if (!scene.options.loadMap){
        //generating the tileData array (population, etc)
        scene.tileData = setupTileData(scene)      
    } else {
        scene.tileData = scene.loadedGameData.tileData

        assignImageTypes(scene)
    }
    if (!scene.options.loadMap){
        //generating the tileData array (population, etc)
        generateCities(scene)      
    } else {
        scene.cities = new Map(Object.entries(scene.loadedGameData.cities))
        //assign all values in cities to city class
        assignCityClasses(scene)
        //load city text info
        loadCityTextInfos(scene)
        
        console.log(scene.cities)

    }
    //setup the tileData array
    if (!scene.options.loadMap){
        //generating the tileData array (population, etc)
        scene.railwayLines = []    
    } else {
        scene.railwayLines = []    
        createLinesFromSaveGame(scene)
    }
}
export function setupTilemaps(scene){
    setupMainTileMap(scene)
    setupOtherTilemaps(scene)
}