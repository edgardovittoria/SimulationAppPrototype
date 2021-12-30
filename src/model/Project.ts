import {Simulation} from "./Simulation";

export type Project = {
    name: string,
    description: string,
    model: string, //TODO: replace string with the correct type of the model
    materials: string, //TODO: replace string with the correct type of the materials
    physics: string, //TODO: replace string with the correct type of the physics (ports)
    simulations: Simulation[]
}