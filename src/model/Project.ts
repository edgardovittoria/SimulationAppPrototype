import {CanvasState, UsersState} from "cad-library";
import {Simulation} from "./Simulation";
import {Port, Probe} from "./Port";

export type Project = {
    name: string,
    description: string,
    model: CanvasState,
    ports: (Port | Probe)[],
    simulations: Simulation[],
    screenshot: string | undefined,
    owner: UsersState
    sharedWidth?: UsersState[]
    faunaDocumentID?: string
}
