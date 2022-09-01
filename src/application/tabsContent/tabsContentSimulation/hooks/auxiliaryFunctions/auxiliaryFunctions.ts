import {ComponentEntity, Material, meshFrom} from "cad-library";
import {STLExporter} from "three/examples/jsm/exporters/STLExporter";
import * as THREE from "three";

export function generateSTLListFromComponents(materialList: Material[], components: ComponentEntity[]){

    let filteredComponents: ComponentEntity[][] = []

    materialList.forEach(m => {
        (components) && filteredComponents.push(components.filter(c => c.material?.name === m.name))
    })

    let STLList: { material: string, STL: string }[] = []

    let exporter = new STLExporter();

    filteredComponents.forEach(fc => {
        let scene = new THREE.Scene()
        fc.forEach(c => {
            scene.add(meshFrom(c))
            scene.updateWorldMatrix(true, true)
        })

        const re = new RegExp('exported', 'g')

        let STLToPush  = exporter.parse(scene).replace(re, fc[0].material?.name as string)
        STLList.push({material: fc[0].material?.name as string, STL: STLToPush})
    })

    return STLList
}

export function getMaterialListFrom(components: ComponentEntity[]) {
    let materialList: Material[] = []
    components?.forEach(c => {
        if (c.material?.name && materialList.filter(m => m.name === c.material?.name).length === 0) {
            materialList.push(c.material)
        }
    })
    return materialList
}