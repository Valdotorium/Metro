

export class cityDistrict {
    constructor(id, city, posx, posy, game) {
        this.id = id;
        this.validNeighbours = [];
        this.posx = posx;
        this.posy = posy;
        //check for tiles that are valid for the next city district to be placed
        //1 city district = 1 city tile
        this.addNeighbourTiles(game, posx, posy);

        //if the tile type is below 4, do not generate
        if (game.generatedTilemap[posx][posy] < 4) {
            game.generatedTilemap[posx][posy] = 10;
            game.tileMap.putTileAt(10, posx, posy)
        }

    }

    addNeighbourTiles(game, posx, posy) {
        //tiles are valid if their type is 0,1,2 or 3
        if (0 <= game.generatedTilemap[posx+1][posy] && game.generatedTilemap[posx + 1][posy+0] <= 4) {
            let neighbour = [posx + 1, posy];
            this.validNeighbours.push(neighbour);
        }
        if (0 <= game.generatedTilemap[posx][posy - 1] && game.generatedTilemap[posx][posy - 1] <= 4) {
            let neighbour = [posx, posy - 1];
            this.validNeighbours.push(neighbour);
        }
        if (0 <= game.generatedTilemap[posx - 1][posy] && game.generatedTilemap[posx - 1][posy] <= 4) {
            let neighbour = [posx - 1, posy];
            this.validNeighbours.push(neighbour);
        }
        if (0 <= game.generatedTilemap[posx][posy + 1] && game.generatedTilemap[posx][posy + 1] <= 4) {
            let neighbour = [posx, posy + 1];
            this.validNeighbours.push(neighbour);
        }
    }
}

