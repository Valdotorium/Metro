export class cityDistrict {
    //setting object vars
    constructor(id, city, posx, posy, game, districttype) {
        this.id = id;
        this.validNeighbours = [];
        this.posx = posx;
        this.posy = posy;
        this.districttype = districttype;
        //this.city = city;
    }
    //actually creating it
    createDistrict(game) {
        //check for tiles that are valid for the next city district to be placed
        //1 city district = 1 city tile
        //if the tile type is below 4, do not generate
        if (game.generatedTilemap[this.posx][this.posy] < 4) {
            game.generatedTilemap[this.posx][this.posy] = this.districttype;
            game.tileMap.putTileAt(this.districttype, this.posx, this.posy)
            game.tileData[this.posx][this.posy].population = Math.round(game.tileData[this.posx][this.posy].population * 1.25 + this.districttype - 10);
        }
        this.population = game.tileData[this.posx][this.posy].population;
    }


    addNeighbourTiles(game, districttype) {
        //only do that if the coordinates are within mapSize
        if(0 < this.posx < game.tileMapOptions.size - 1 && 0 < this.posy < game.tileMapOptions.size - 1){
            let posx = this.posx;
            let posy = this.posy;
            //tiles are valid if their type is 0,1,2 or 3
            if (0 <= game.generatedTilemap[posx+1][posy] && game.generatedTilemap[posx + 1][posy+0] <= 4) {
                let neighbour = [posx + 1, posy, this.determineDistrictType(districttype)];
                this.validNeighbours.push(neighbour);
            }
            if (0 <= game.generatedTilemap[posx][posy - 1] && game.generatedTilemap[posx][posy - 1] <= 4) {
                let neighbour = [posx, posy - 1, this.determineDistrictType(districttype)];
                this.validNeighbours.push(neighbour);
            }
            if (0 <= game.generatedTilemap[posx - 1][posy] && game.generatedTilemap[posx - 1][posy] <= 4) {
                let neighbour = [posx - 1, posy, this.determineDistrictType(districttype)];
                this.validNeighbours.push(neighbour);
            }
            if (0 <= game.generatedTilemap[posx][posy + 1] && game.generatedTilemap[posx][posy + 1] <= 4) {
                let neighbour = [posx, posy + 1, this.determineDistrictType(districttype)];
                this.validNeighbours.push(neighbour);
            }
        }
    }
    determineDistrictType(districttype){
        //determine the type of the district
        if (districttype == 9) {
            districttype = Math.floor(Math.random() * 3) + 1
            switch (districttype) {
                case 1:
                    districttype = 10
                    break;
                case 2:
                    districttype = 16
                    break;
                case 3:
                    districttype = 18
                    break;
            }
        }else{
            let random = Math.floor(Math.random() * 100)
            if (random > 90) {
                let wheigt = Math.floor(Math.random() * 4) + 1
                switch (wheigt) {
                    case 1:
                        districttype = 10
                        break;
                    case 2:
                        districttype = 16
                        break;
                    case 3:
                        districttype = 18
                        break;
                    case 4:
                        districttype = 18
                        break;
                }
            }
            else{
            }
        }
        return districttype
        
        
    }
}

