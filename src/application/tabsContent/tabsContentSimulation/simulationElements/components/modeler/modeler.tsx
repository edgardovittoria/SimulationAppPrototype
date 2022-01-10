import React, {useEffect, useState} from 'react';
import {Canvas} from "@react-three/fiber";
import * as THREE from 'three';
import {Mesh, MeshPhongMaterial} from 'three';
import {OrbitControls} from '@react-three/drei'
import './modeler.css'
import {GrCube, GrCubes} from "react-icons/gr";
import {GiCubeforce} from "react-icons/gi";
import {Project} from "../../../../../../model/Project";
import {
    ComponentEntity,
    FactoryShapes,
    ImportActionParamsObject,
    ImportCadProjectButton
} from '@Draco112358/cad-library'
import {updateColorComponent} from "../../../../../../store/projectSlice";


interface ModelerProps {
    selectedProject: Project | undefined,
    importModel: (params: ImportActionParamsObject) => any,
    selectedComponent: ComponentEntity[],
    selectComponent: Function,
    updateComponentColor: Function
}

export const Modeler: React.FC<ModelerProps> = (
    {selectedProject, importModel, selectComponent, selectedComponent, updateComponentColor}
) => {

    useEffect(() => {
        if(selectedProject && selectedProject.model.components && selectedComponent.length === 0){
            selectedProject.model.components.forEach(component => {
                updateComponentColor({keyComponent: component.keyComponent, color: component.color})
            })
        }else{
            selectedComponent.forEach(component => {
                updateComponentColor({keyComponent: component.keyComponent, color: '#1302fb'})
            })
        }
    }, [selectedComponent]);


    return (
        <>
            {(selectedProject && selectedProject.model.components) ?
                <Canvas style={{width: "1836px", height: "800px"}}>
                    <pointLight position={[100, 100, 100]} intensity={0.8}/>
                    <hemisphereLight color={'#ffffff'} groundColor={new THREE.Color('#b9b9b9')} position={[-7, 25, 13]}
                                     intensity={0.85}/>
                    {selectedProject.model.components.map(component => {
                        return (
                            <mesh
                                userData={{keyComponent: component.keyComponent}}
                                key={component.keyComponent}
                                onPointerEnter={(event) => {
                                    (event.object as Mesh).material = new THREE.MeshPhongMaterial({
                                        color: '#0423fa',
                                        wireframe: true
                                    })
                                }}
                                onPointerLeave={(event) => {
                                    (event.object as Mesh).material = new THREE.MeshPhongMaterial({
                                        color: component.color,
                                        wireframe: false
                                    })
                                }}
                                onDoubleClick={() => {selectComponent(component)}}
                            >
                                <FactoryShapes entity={component}/>
                            </mesh>
                        )
                    })}
                    <OrbitControls/>
                </Canvas>
                :
                <div>
                    <ImportCadProjectButton className='btn button-primary btn-import' importAction={importModel}
                                            actionParams={{id: selectedProject?.name} as ImportActionParamsObject}>
                        <GiCubeforce style={{width: "25px", height: "25px", marginRight: "5px"}}/> Import CAD
                    </ImportCadProjectButton>
                </div>
            }
        </>
    )

}

/*TODO: refactor: move model outliner into another component and create css file for style*/

interface ModelOutlinerProps {
}

export const ModelOutliner: React.FC<ModelOutlinerProps> = () => {
    return (
        <>
            <div className='col mt-4'>
                <div className="row ps-2">
                    <div className="col-2">
                        <GrCubes className="outlinerGroupIcon"/>
                    </div>
                    <div className="col-10 text-start ps-0">
                        <h5 className="outlinerGroupTitle">Cube</h5>
                    </div>
                </div>
                <div className="row p-1 ps-5">
                    <div className="row">
                        <div className="col-2">
                            <GrCube className="outlinerGroupIcon"/>
                        </div>
                        <div className="col-10 text-start">
                            <h6 className="outlinerGroupTitle">Part 1</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <GrCube className="outlinerGroupIcon"/>
                        </div>
                        <div className="col-10 text-start">
                            <h6 className="outlinerGroupTitle">Part 2</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <GrCube className="outlinerGroupIcon"/>
                        </div>
                        <div className="col-10 text-start">
                            <h6 className="outlinerGroupTitle">Part 3</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}