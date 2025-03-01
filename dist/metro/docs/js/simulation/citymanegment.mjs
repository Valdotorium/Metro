import { city } from "./citys.mjs";
export function generateCities(game) {

    //map that stores a city object with the cities name
    game.cities = new Map()
    let mapSize = game.tileMapOptions.size
    game.cityCount = Math.round(mapSize / 8)
    //add predefined cities
    game.cities.set("Fallford", new city(game, 5,5, "Fallford", 15))
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
            game.cities.set(randomCityName, newCity);
            cityNames.splice(randomIndex, 1);
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
    let cityNames = ["New York", "Los Angeles", "Boston", "San Francisco", "Chicago", "Dallas", "Miami", "Houston", "Philadelphia", "Atlanta", "Washington", "San Diego", "San Jose", "Seattle", "Portland", "Hamburg", "Baltimore", "Aalen", "Cleveland", "Minneapolis", "Denver", "Pittsburgh", "New Orleans", "Charlotte", "Tampa", "Austin", "San Antonio", "Jacksonville", "Indianapolis", "St. Louis", "Memphis", "Boston", "Paris", "Nashville", "Berlin", "Jacksonville", "Washington", "Baltimore", "Detroit"]
    let randomCity = Math.floor(Math.random() * game.cityCount)
    let growingcity = cityNames[randomCity]
    if(Math.floor(Math.random() * 1000) < (game.cities.get(growingcity).population*0.05+game.cities.get(growingcity).size*0.1)){
        if(game.cities.get(growingcity).validnextdistricts.length>0){
            let randomIndex = Math.floor(Math.random() * game.cities.get(growingcity).validnextdistricts.length);
            let [districtX, districtY] =  game.cities.get(growingcity).validnextdistricts[randomIndex];
            game.cities.get(growingcity).addDistrict(game.cities.get(growingcity).districts.length, game.cities.get(growingcity), districtX, districtY, game)
            game.cities.get(growingcity).size++
            console.log(game.cities.get(growingcity).districts.length, growingcity)
            game.cities.get(growingcity).validnextdistricts.splice(randomIndex, 1);
        }
    }
}

