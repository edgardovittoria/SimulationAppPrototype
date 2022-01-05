export type Material = {
    name: string,
    color: string
    //TODO: add face or part of component that is associated with the material
}


export const allowedMaterial: Map<string, Material> = new Map<string, Material>()
allowedMaterial.set('Alumina', {name: 'Alumina', color: '#61d6b8'})
allowedMaterial.set('Copper', {name: 'Copper', color: '#f18151'})
