

export class cityDistrict {
    constructor(id, city, posx, posy, game) {
        this.id = id;
        this.validNeighbours = [];
        this.city = city;
        this.posx = posx;
        this.posy = posy;
        this.addNeighbourTiles(game, city, posx, posy);
        game.generatedTilemap[posx][posy] = 10;
    }

    addNeighbourTiles(game, posx, posy) {
        if (0 < game.generatedTilemap[(posx + 1)][(posy)] && game.generatedTilemap[(posx + 1)][posy] < 4) {
            let neighbour = [posx + 1, posy];
            this.validNeighbours.push(neighbour);
        }
        if (0 < game.generatedTilemap[posx][posy - 1] && game.generatedTilemap[posx][posy - 1] < 4) {
            let neighbour = [posx, posy - 1];
            this.validNeighbours.push(neighbour);
        }
        if (0 < game.generatedTilemap[posx - 1][posy] && game.generatedTilemap[posx - 1][posy] < 4) {
            let neighbour = [posx - 1, posy];
            this.validNeighbours.push(neighbour);
        }
        if (0 < game.generatedTilemap[posx][posy + 1] && game.generatedTilemap[posx][posy + 1] < 4) {
            let neighbour = [posx, posy + 1];
            this.validNeighbours.push(neighbour);
        }
    }
}

