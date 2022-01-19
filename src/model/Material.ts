export type Material = {
    name: string,
    color: string,
    permeability: number,
    tangent_delta_permeability?: number,
    custom_permeability?: [number, number],
    permittivity: number,
    tangent_delta_permittivity?: number,
    custom_permittivity?: [number, number],
    conductivity: number,
    tangent_delta_conductivity?: number,
    custom_conductivity?: [number, number]
    associatedComponentKey: number[]
}

