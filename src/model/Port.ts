import {ComponentEntity} from "@Draco112358/cad-library";

export type Port = {
    name: string,
    category: 'port' | 'lumped',
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
    id: string,
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

export type Probe = {
    name: string,
    category: 'probe',
    isSelected: boolean,
    elements: ComponentEntity[],
    groupPosition: [number, number, number]
}