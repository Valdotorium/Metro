import { city } from "./citys.mjs";
export function generateCity(game) {

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
    for (let i = 0; i < game.cityCount - 1; i++) {
        console.log("mm")
        let randomIndex = Math.round(Math.random() * cityNames.length - 1)
        let randomCityName = cityNames[randomIndex]
        game.cities.set(randomCityName, new city(game, Math.floor(Math.random() * (mapSize - 10)) + 5, Math.floor(Math.random() * (mapSize - 10)) + 5, randomCityName, 5))
        cityNames.splice(randomIndex, 1)
    }

    ////game.cities.NewYork = new city(game, 30, 50, "New York", 20)
    ////game.cities.LosAngeles = new city(game, 50, 30, "Los Angeles", 10)
    ////game.cities.Boston = new city(game, 10, 30, "Boston", 10)
    ////game.cities.SanFrancisco = new city(game, 30, 10, "San Francisco", 10)
    //game.cities.Chicago = new city(game, 10, 10, "Chicago", 10)
    //game.cities.Dallas = new city(game, 50, 50, "Dallas", 10)
    //game.cities.Miami = new city(game, 50, 10, "Miami", 10)
    //game.cities.Seattle = new city(game, 10, 50, "Seattle", 10)
    //game.cities.Detroit = new city(game, 30, 30, "Detroit", 10)
    //game.cities.Houston = new city(game, 70, 70, "Houston", 10)
    //game.cities.Phoenix = new city(game, 70, 10, "Phoenix", 10)
    //game.cities.SanDiego = new city(game, 70, 30, "San Diego", 10)
    //game.cities.Tampa = new city(game, 70, 50, "Tampa", 10)
    //game.cities.Minneapolis = new city(game, 70, 10, "Minneapolis", 10)
    //game.cities.Cleveland = new city(game, 70, 30, "Cleveland", 10)
    //game.cities.Orlando = new city(game, 70, 50, "Orlando", 10)
    //game.cities.Pittsburgh = new city(game, 70, 10, "Pittsburgh", 10)
    //game.cities.Sacramento = new city(game, 70, 30, "Sacramento", 10)
    //game.cities.Charlotte = new city(game, 70, 50, "Charlotte", 10)
    //game.cities.Portland = new city(game, 70, 10, "Portland", 10)
    //game.cities.StLouis = new city(game, 70, 30, "St Louis", 10)
    //game.cities.Milwaukee = new city(game, 70, 50, "Milwaukee", 10)
    //game.cities.Columbus = new city(game, 70, 10, "Columbus", 10)
    //game.cities.Indianapolis = new city(game, 70, 30, "Indianapolis", 10)
    //game.cities.Austin = new city(game, 70, 50, "Austin", 10)
    //game.cities.VirginiaBeach = new city(game, 70, 10, "Virginia Beach", 10)
    //game.cities.Atlanta = new city(game, 70, 30, "Atlanta", 10)
    //game.cities.Oakland = new city(game, 70, 50, "Oakland", 10)
    //game.cities.Raleigh = new city(game, 70, 10, "Raleigh", 10)
    //game.cities.Nashville = new city(game, 70, 30, "Nashville", 10)
    //game.cities.Memphis = new city(game, 70, 50, "Memphis", 10)
    //game.cities.Jacksonville = new city(game, 70, 10, "Jacksonville", 10)
}