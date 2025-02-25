import { cityDistrict } from "./citydistrict.mjs";

export class city {
    constructor(game, x, y, name, size) {
        //the next districts that can be added to this city
        this.validnextdistricts = []; 
        //the existing tiles that belong to this city
        this.districts = [];

        this.x = x;
        this.y = y;
        //the root district of the city
        this.citycenter = this.addDistrict(0, this, x, y, game);

        this.name = name;
        this.size = size;
        for (let i = 0; i < size; i++) {
            if(this.validnextdistricts.length>0){
                //generate one of the districts on a valid tile
                let randomIndex = Math.floor(Math.random() * this.validnextdistricts.length);
                let [districtX, districtY] = this.validnextdistricts[randomIndex];
                this.addDistrict(this.districts.length, this, districtX, districtY, game);
                //prevent multiple districts per tile
                this.validnextdistricts.splice(randomIndex, 1);
            }
        }
    }
    addDistrict(id, city, x, y, game) {
        let tempdist = new cityDistrict(id, city, x, y, game);
        for (let i = 0; i < tempdist.validNeighbours.length; i++) {
            this.validnextdistricts.push(tempdist.validNeighbours[i]);
        }
        this.districts.push(tempdist)
    }
    }



