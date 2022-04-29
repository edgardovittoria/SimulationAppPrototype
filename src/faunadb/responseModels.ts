import {Signal} from "../model/Port";
import {Simulation} from "../model/Simulation";

export type FaunaResSignals = {
    data: {data: Signal, ref: Object, ts: number}[]
}

export type FaunaResSimulation = {
    data: {data: Simulation, ref: Object, ts: number}
}

