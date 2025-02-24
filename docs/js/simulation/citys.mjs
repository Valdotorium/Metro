import { cityDistrict } from "./citydistrict.mjs";

export class city {
    constructor(game, x, y, name, size) {
        this.validnextdistricts = []; 
        this.districts = [];
        this.citycenter = this.addDistrict(0, this, x, y, game);
        this.name = name;
        this.size = size;
        for (let i = 0; i < size; i++) {
            let randomIndex = Math.floor(Math.random() * this.validnextdistricts.length);
            let [districtX, districtY] = this.validnextdistricts[randomIndex];
            this.addDistrict(this.districts.length, this, districtX, districtY, game);
        }
    }
    addDistrict(id, city, x, y, game) {
        let tempdist = new cityDistrict(id, city, x, y, game);
        this.validnextdistricts.push(tempdist.validNeighbours);
        this.districts.push(tempdist)
    }
    }



