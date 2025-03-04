import { city } from "./citys.mjs";
import { cityDistrict } from "./citydistrict.mjs";
export function generateCities(game) {

    //map that stores a city object with the cities name
    game.cities = new Map()
    let mapSize = game.tileMapOptions.size
    game.cityCount = Math.round(mapSize / 8)
    //add predefined cities
    let firstCity = new city(game, 5,5, "Fallford", 15)
    firstCity.createCity(game)
    //game.cities.set("Fallford", firstCity)

    console.log(game.cityCount)
    //generate cities at random positions with random names selected from a city names array
    
    //array with 100 random international city names
    let cityNames = ["New York", "Los Angeles", "Boston", "San Francisco", "Chicago", "Dallas", "Miami", "Houston", "Philadelphia", "Atlanta", "Washington", "San Diego", "San Jose", "Seattle", "Portland", "Hamburg", "Baltimore", "Aalen", "Cleveland", "Minneapolis", "Denver", "Pittsburgh", "New Orleans", "Charlotte", "Tampa", "Austin", "San Antonio", "Jacksonville", "Indianapolis", "St. Louis", "Memphis", "Boston", "Paris", "Nashville", "Berlin", "Jacksonville", "Washington", "Baltimore", "Detroit"]
    //try to generate cities at random positions with random names selected from a city names array
    //TODO: #10 delete city again if its root tile is not valid
    try{
    for (let i = 0; i < game.cityCount - 1; i++) {
        let randomIndex = Math.floor(Math.random() * cityNames.length);
        let randomCityName = cityNames[randomIndex];
        let cityX = Math.floor(Math.random() * (mapSize - 10)) + 5
        let cityY = Math.floor(Math.random() * (mapSize - 10)) + 5
        // Check if the root tile is valid
        if (0 <= game.generatedTilemap[cityX][cityY] && game.generatedTilemap[cityX][cityY] < 4) {
            let newCity = new city(game, cityX, cityY, randomCityName, 5);
            newCity.createCity(game);
            game.cities.set(randomCityName, newCity);
            cityNames.splice(randomIndex, 1);
            console.log(`City ${newCity} has been created.`);
         } else {
            console.log(`City ${randomCityName} has an invalid root tile.`);
         }
            
    }}
    catch(error){
        console.log(error)
    }
    game.cityCount = game.cities.size
    game.cityNames = Array.from(game.cities.keys())
    console.log(game.cityCount)
}
export function CityGrowth(game) {
    let randomCity = Math.floor(Math.random() * game.cityNames.length)
    let growingcity = game.cityNames[randomCity]
    if(Math.floor(Math.random() * (1000 / game.simulation.speed)) < (game.cities.get(growingcity).population*0.05+game.cities.get(growingcity).size*0.1)){
        if(game.cities.get(growingcity).validnextdistricts.length>0){
            let randomIndex = Math.floor(Math.random() * game.cities.get(growingcity).validnextdistricts.length);
            let [districtX, districtY] =  game.cities.get(growingcity).validnextdistricts[randomIndex];
            game.cities.get(growingcity).addDistrict(game.cities.get(growingcity).districts.length, game.cities.get(growingcity), districtX, districtY, game)
            game.cities.get(growingcity).size++
            console.log(game.cities.get(growingcity).districts.length, growingcity)
            game.cities.get(growingcity).validnextdistricts.splice(randomIndex, 1);
            game.cities.get(growingcity).cityinfo.setText(`City: ${growingcity} \n Population: ${game.cities.get(growingcity).population+1} \n Size: ${game.cities.get(growingcity).size}`)
        }
    }
}

export function assignCityClasses(game){
    //loading cities from savegames
    for(let cityJSON of game.cities.values()){
        let c = new city()
        c = Object.assign(c, cityJSON)
        
        //same for all citydistricts
        for(let district of c.districts){
            district = Object.assign(new cityDistrict(), district)
            district.game = game
        }
        cityJSON = c
        //overwrite the item in game.cities
        game.cities.set(c.name, c)
    }
    //log cities
    console.log(game.cities)
    
}

