export function makeEmptyTileMap(size){
    var tileMap = [];
    //make a 2d array containing zeros with size
    for(var i = 0; i < size; i++){
        tileMap[i] = [];
        for(var j = 0; j < size; j++){
            tileMap[i][j] = 0;
        }
    }
    return tileMap;
}