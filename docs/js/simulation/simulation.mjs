import { CityGrowth } from "./citymanegment.mjs"
import { simulateTime } from "./time.mjs"
export function setupSimulation(scene){
    // set up simulation variables
    scene.simulation = {}
    scene.simulation.speed = 1
    //simulation time object
    scene.simulation.time = {year: 2000, month: 1, day: 1, hour: 1, minute: 1}
}

export function simulate(scene, deltaTime){
    if (scene.simulation.speed > 0){
        //call main simulation functions
        simulateTime(scene, deltaTime)
        CityGrowth(scene)
    }
    
}