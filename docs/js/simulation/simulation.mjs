import { CityGrowth } from "./citymanegment.mjs"
import { simulateTime } from "./time.mjs"
export function setupSimulation(scene){
    // set up simulation
    scene.simulation = {}
    scene.simulation.speed = 1
    scene.simulation.time = {year: 2000, month: 1, day: 1, hour: 1, minute: 1}

}


export function simulate(scene){

    simulateTime(scene)
    //TODO: make time simulation
    CityGrowth(scene)
    
}