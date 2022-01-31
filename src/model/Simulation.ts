import {Result} from "./Result";

export type Simulation = {
    name: string,
    started: string,
    ended: string,
    status: 'Queued' | 'Paused' | 'Completed' | 'Failed'
    results: Result[],
    associatedProject: string
}