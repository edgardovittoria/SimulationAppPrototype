import { CanvasState } from "@Draco112358/cad-library";
import {Simulation} from "./Simulation";
import {Material} from "./Material";

export type Project = {
    name: string,
    description: string,
    model: CanvasState,
    materials: Material[], //TODO: replace string with the correct type of the materials
    physics: string, //TODO: replace string with the correct type of the physics (ports)
    simulations: Simulation[]
}

