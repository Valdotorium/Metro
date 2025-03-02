import { CityGrowth } from "./citymanegment.mjs"
export function setupSimulation(game){
    // set up simulation
    game.simulation = {}
    game.simulation.time = {year: 2000, month: 1, day: 1, hour: 1, minute: 1}

}


export function simulate(game){
    //TODO: make time simulation
    CityGrowth(game)
    
}