import { CanvasState } from "@Draco112358/cad-library";
import {Simulation} from "./Simulation";

export type Project = {
    name: string,
    description: string,
    model: CanvasState,
    ports: Port[], //TODO: replace string with the correct type of the physics (ports)
    simulations: Simulation[]
}

export type Port = {
    name: string,
    type: string,
    position: {
        first: [number, number, number],
        last: [number, number, number]
    },
    isSelected: boolean
}

