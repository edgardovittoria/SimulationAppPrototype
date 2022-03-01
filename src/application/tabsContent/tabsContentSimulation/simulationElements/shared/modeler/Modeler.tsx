import React, {useEffect, useState} from 'react';
import {Canvas} from "@react-three/fiber";
import * as THREE from 'three';
import {Color, Mesh, MeshPhongMaterial} from 'three';
import {OrbitControls, TransformControls} from '@react-three/drei'
import './modeler.css'
import {GiCubeforce} from "react-icons/gi";
import {Project} from "../../../../../../model/Project";
import {
    ComponentEntity,
    FactoryShapes,
    ImportActionParamsObject,
    ImportCadProjectButton
} from '@Draco112358/cad-library'


interface ModelerProps {
    selectedProject: Project | undefined,
    importModel: (params: ImportActionParamsObject) => any,
    // selectedComponent: ComponentEntity[],
    selectComponent: Function,
    // unselectComponent: Function,
    // updateComponentColor: Function,
    selectPort: Function
}

export const Modeler: React.FC<ModelerProps> = (
    {
        selectedProject, importModel, selectComponent, selectPort
    }
) => {

    const [previousColor, setPreviousColor] = useState<Color>({} as Color);

    // useEffect(() => {
    //     if (selectedProject && selectedProject.model.components && selectedComponent.length === 0) {
    //         selectedProject.model.components.forEach(component => {
    //             updateComponentColor({keyComponent: component.keyComponent, color: component.color})
    //         })
    //     } else {
    //         selectedComponent.forEach(component => {
    //             updateComponentColor({keyComponent: component.keyComponent, color: '#1302fb'})
    //         })
    //     }
    // }, [selectedComponent])


    return (
        <div className="d-flex justify-content-center">
            {(selectedProject && selectedProject.model.components) ?
                <Canvas style={{width: "1156px", height: "800px"}}>
                    <pointLight position={[100, 100, 100]} intensity={0.8}/>
                    <hemisphereLight color={'#ffffff'} groundColor={new THREE.Color('#b9b9b9')} position={[-7, 25, 13]}
                                     intensity={0.85}/>
                    {selectedProject.model.components.map(component => {
                        return (
                            <mesh
                                userData={{keyComponent: component.keyComponent, isSelected: false}}
                                key={component.keyComponent}
                                onPointerEnter={(event) => {
                                    setPreviousColor(((event.object as Mesh).material as MeshPhongMaterial).color);
                                    (event.object as Mesh).material = new THREE.MeshPhongMaterial({
                                        color: '#0423fa',
                                        wireframe: true
                                    })
                                }}
                                onPointerLeave={(event) => {
                                    (event.object as Mesh).material = new THREE.MeshPhongMaterial({
                                        color: previousColor,
                                        wireframe: false
                                    })
                                }}
                                onDoubleClick={() => {
                                    selectComponent(component)
                                }}
                                position={component.transformationParams.position}
                                scale={component.transformationParams.scale}
                                rotation={component.transformationParams.rotation}
                            >
                                <FactoryShapes entity={component}/>
                            </mesh>
                        )
                    })}
                    {(selectedProject && selectedProject.ports.length !== 0) &&
                    <>
                        {selectedProject?.ports.map(port => {
                            return(
                                <>
                                    <TransformControls
                                        position={port.position.first}
                                        showX={port.isSelected}
                                        showY={port.isSelected}
                                        showZ={port.isSelected}
                                    >
                                        <mesh onClick={() => selectPort(port.name)}>
                                            <torusGeometry args={[.1, .05, 8, 20, Math.PI*2]}/>
                                            <meshPhongMaterial color='red'/>
                                        </mesh>
                                    </TransformControls>
                                    <TransformControls
                                        position={port.position.last}
                                        showX={port.isSelected}
                                        showY={port.isSelected}
                                        showZ={port.isSelected}
                                    >
                                        <mesh onClick={() => selectPort(port.name)}>
                                            <torusGeometry args={[.1, .05, 8, 20, Math.PI*2]}/>
                                            <meshPhongMaterial color='red'/>
                                        </mesh>
                                    </TransformControls>
                                </>


                            )
                        })
                        }
                    </>
                    }
                    <OrbitControls makeDefault/>
                </Canvas>
                :
                <div>
                    <ImportCadProjectButton className='btn button-primary btn-import' importAction={importModel}
                                            actionParams={{id: selectedProject?.name} as ImportActionParamsObject}>
                        <GiCubeforce style={{width: "25px", height: "25px", marginRight: "5px"}}/> Import CAD
                    </ImportCadProjectButton>
                </div>
            }
        </div>
    )

}




