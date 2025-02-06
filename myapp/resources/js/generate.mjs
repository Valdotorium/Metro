export function generateTilemap(game){
    //get the tilemap size
    const mapSize = game.tileMapOptions.get("size")

    console.log("map size is: ", mapSize)

    game.tileMap = []

    for (let i = 0; i < mapSize; i++){

        let currentRow = []
        for(let j = 0; j < mapSize; j++){
            currentRow.push(1)
        }
        game.tileMap.push(currentRow)
    }

    console.log("generated tilemap!", game.tileMap)
}