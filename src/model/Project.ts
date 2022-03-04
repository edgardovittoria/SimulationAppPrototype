import { CanvasState, ComponentEntity } from "@Draco112358/cad-library";
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
    category: string,
    type: number,
    inputElement: ComponentEntity,
    outputElement: ComponentEntity,
    isSelected: boolean,
    rlcParams: RLCParams
}

export type RLCParams = {
    impedance?: number,
    resistance?: number,
    capacitance?: number,
}