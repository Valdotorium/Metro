import { cityDistrict } from "./citydistrict.mjs";

export class city {
    //store the citys data
    constructor(game, x, y, name, size) {
        //the next districts that can be added to this city
        this.validnextdistricts = []; 
        //the existing tiles that belong to this city
        this.districts = [];
        this.population = 0;
        this.x = x;
        this.y = y;
        this.name = name;
        this.size = size;
        

    }
    //actually creating it
    createCity(game){
        //the root district of the city
        this.citycenter = this.addDistrict(0, this, this.x, this.y, game, 9);
        //size -1, because one district has already been created
        for (let i = 0; i < this.size - 1; i++) {
            if(this.validnextdistricts.length>0){
                //generate one of the districts on a valid tile
                let randomIndex = Math.floor(Math.random() * this.validnextdistricts.length);
                let [districtX, districtY, districttype] = this.validnextdistricts[randomIndex];
                this.addDistrict(this.districts.length, this, districtX, districtY, game, districttype);
                //prevent multiple districts per tile
                this.validnextdistricts.splice(randomIndex, 1);
            }
        }
        this.textInfo(game, this.x, this.y);
    }
    addDistrict(id, city, x, y, game, districttype) {
        let tempdist = new cityDistrict(id, city, x, y, game, districttype);
        tempdist.createDistrict(game);
        tempdist.addNeighbourTiles(game, districttype);

        for (let i = 0; i < tempdist.validNeighbours.length; i++) {
            this.validnextdistricts.push(tempdist.validNeighbours[i]);
        }
        this.population += tempdist.population;
        this.districts.push(tempdist)
        this.size = this.districts.length
        return [x, y]
    }
    
    textInfo(game, x, y) {
        x = game.tileMap.tileToWorldX(x)
        y = game.tileMap.tileToWorldY(y)
        // future features and additional information can be added here like happiness, wealth, etc.
        this.cityinfo = game.add.text(x, y, `City: ${this.name} \n Population: ${this.population} \n Size: ${this.size}`, { fontSize: '16px', fill: '#000' });
        this.cityinfo.setOrigin(0.5, 0.5);
        }
    }



