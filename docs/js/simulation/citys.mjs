import { cityDistrict } from "./citydistrict.mjs";

export class city {
    constructor(game, x, y, name, size) {
        this.validnextdistricts = []; 
        this.districts = [];
        this.x = x;
        this.y = y;
        this.citycenter = this.addDistrict(0, this, x, y, game);
        this.name = name;
        this.size = size;
        for (let i = 0; i < size; i++) {
            if(this.validnextdistricts.length>0){
                let randomIndex = Math.floor(Math.random() * this.validnextdistricts.length);
                let [districtX, districtY] = this.validnextdistricts[randomIndex];
                this.addDistrict(this.districts.length, this, districtX, districtY, game);
                this.validnextdistricts.splice(randomIndex, 1);
            }
        }
        console.log(this.districts)
        console.log(this.validnextdistricts)
    }
    addDistrict(id, city, x, y, game) {
        let tempdist = new cityDistrict(id, city, x, y, game);
        for (let i = 0; i < tempdist.validNeighbours.length; i++) {
            this.validnextdistricts.push(tempdist.validNeighbours[i]);
        }
        this.districts.push(tempdist)
    }
    }



