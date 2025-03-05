export function switchTileMapData(tilemap, newData){
    tilemap.forEachTile(function(tile){
        tilemap.putTileAt(newData[tile.x][tile.y], tile.x, tile.y)
    })
}