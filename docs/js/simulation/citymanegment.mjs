import { city } from "./citys.mjs";
export function generateCity(game) {
    game.cities = {}
    game.cities.Fallford = new city(game, 5, 5, "Fallford", 5)
}