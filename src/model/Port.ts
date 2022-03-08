import {ComponentEntity} from "@Draco112358/cad-library";

export type Port = {
    name: string,
    category: string,
    type: number,
    inputElement: ComponentEntity,
    outputElement: ComponentEntity,
    isSelected: boolean,
    rlcParams: RLCParams,
    associatedSignal: Signal | undefined
}

export type RLCParams = {
    inductance?: number,
    resistance?: number,
    capacitance?: number,
}

export interface Signal {
    name: string,
    type: string,
    signalValues: SignalValues[]
}

export interface SignalValues {
    freq: number,
    signal: {
        Re: number,
        Im: number
    }
}