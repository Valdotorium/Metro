import { city } from "./citys.mjs";
import { cityDistrict } from "./citydistrict.mjs";
export function generateCities(game) {

    //map that stores a city object with the cities name
    game.cities = new Map()
    let mapSize = game.tileMapOptions.size
    game.cityCount = Math.round(mapSize / 10)
    //add predefined cities
    //let firstCity = new city(game, 5,5, "Fallford", 15)
    //firstCity.createCity(game)
    //game.cities.set("Fallford", firstCity)

    console.log(game.cityCount)
    //generate cities at random positions with random names selected from a city names array
    
    //array with 100 random international city names
    let cityNames = ["Unterfolsbach", "Hinterstotzingen", "Niederstenbreckelwede", "Faraway Town", "Kleinkleba", "Lauchheim", "Fallford", "Gotha", "New York", "Paris", "Madrid", "Montepulciano", "Center Valley", "Baltimore", "San Fransokyo", "Berlin", "Athens", "Stuttgart", "Fairbanks", "Juneau", "Windhoek", "Bratislava", "Washington", "Baltimore", "Detroit", "Singapore", "Bielefeld", "Wiesbaden", "Waldsachsen", "Wien", "Bath", "London", "Glasgow", "Oxford", "Dublin", "Porto", "Selfoss", "Aalborg", "Aalen", "Trondheim", "Rovaniemi"]
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
            let newCity = new city(game, cityX, cityY, randomCityName, Math.floor(Math.random() * 7) + 2);
            newCity.createCity(game);
            game.cities.set(randomCityName, newCity);
            cityNames.splice(randomIndex, 1);
            console.log(`City ${newCity} has been created.`);
         } else {
            console.log(`City ${randomCityName} has an invalid root tile.`);
            //so that no city gets lost
            game.cityCount++
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
    let growingcity = game.cityNames[999]
    if(Math.floor(Math.random() * (1500 / game.simulation.speed)) < (game.cities.get(growingcity).population*0.05+game.cities.get(growingcity).size*0.1)){
        if(game.cities.get(growingcity).validnextdistricts.length>0){
            let randomIndex = Math.floor(Math.random() * game.cities.get(growingcity).validnextdistricts.length);
            let [districtX, districtY, districttype] =  game.cities.get(growingcity).validnextdistricts[randomIndex];
            game.cities.get(growingcity).addDistrict(game.cities.get(growingcity).districts.length, game.cities.get(growingcity), districtX, districtY, game, districttype);
            console.log(game.cities.get(growingcity).districts.length, growingcity)
            game.cities.get(growingcity).validnextdistricts.splice(randomIndex, 1);
            game.cities.get(growingcity).cityinfo.setText(`City: ${growingcity} \n Population: ${game.cities.get(growingcity).population} \n Size: ${game.cities.get(growingcity).size}`)
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

export function loadCityTextInfos(scene){
    scene.cityNames = Array.from(scene.cities.keys())
    //call the textInfo function for each city object in the map scene.cities
    //TODO: support creating new cities
    scene.cityNames.forEach(cityName => {
        let city = scene.cities.get(cityName)
        city.textInfo(scene, city.x, city.y)
    })
}

