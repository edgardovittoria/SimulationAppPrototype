import {Result} from "../application/tabsContent/tabsContentSimulation/simulationElements/components/resultsContent/components/LineChart";

export type Simulation = {
    name: string,
    started: string,
    ended: string,
    status: 'Queued' | 'Paused' | 'Completed' | 'Failed'
    results: Result[]
}