export type Material = {
    name: string,
    color: string,
    associatedComponentKey: number[]
}


export const allowedMaterial: Omit<Material, 'associatedComponentKey'>[] = []
allowedMaterial.push({name: 'Alumina', color: '#61d6b8'})
allowedMaterial.push({name: 'Copper', color: '#f18151'})
