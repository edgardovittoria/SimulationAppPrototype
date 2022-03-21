import { CanvasState } from "@Draco112358/cad-library";
import {Simulation} from "./Simulation";
import {Port, Probe} from "./Port";

export type Project = {
    name: string,
    description: string,
    model: CanvasState,
    ports: (Port | Probe)[],
    simulations: Simulation[],
    screenshot: string | undefined
}
