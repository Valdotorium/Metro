export function simulateTime(scene, deltaTime){
    //TODO: simulate time here
    //increase the year, month, day, hour, minute, etc.
    //update the scene.simulation.time object
    let timeStepMinutes = 0.1 * scene.simulation.speed * deltaTime
    scene.simulation.time.minute += timeStepMinutes
    if (scene.simulation.time.minute >= 60){
        scene.simulation.time.minute %= 60
        scene.simulation.time.hour += 1
        if (scene.simulation.time.hour >= 24){
            scene.simulation.time.hour %= 24
            scene.simulation.time.day += 1
            if (scene.simulation.time.day > 30){
                scene.simulation.time.day %= 30
                scene.simulation.time.month += 1
                if (scene.simulation.time.month > 12){
                    scene.simulation.time.month %= 12
                    scene.simulation.time.year += 1
                }
            }
        }
    }
}
