import React from 'react';
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'
import './modeler.css'
import { GrCubes, GrCube } from "react-icons/gr";
import { GiCubeforce } from "react-icons/gi";
import { Project } from "../../../model/Project";
import { FactoryShapes, ImportActionParamsObject, ImportCadProjectButton } from '@Draco112358/cad-library'

interface ModelerProps {
    selectedProject: Project | undefined,
    importModel: (params: ImportActionParamsObject) => any,
    selectProject: Function
}

export const Modeler: React.FC<ModelerProps> = (
    { selectedProject, importModel, selectProject }
) => {

    return (
        <>
            {(selectedProject && selectedProject.model.components !== undefined) ?
                <Canvas style={{ width: "1836px", height: "800px" }}>
                    <pointLight position={[100, 100, 100]} intensity={0.8} />
                    <hemisphereLight color={'#ffffff'} groundColor={new THREE.Color('#b9b9b9')} position={[-7, 25, 13]}
                        intensity={0.85} />
                    {selectedProject.model.components.map(component => {
                        return (
                            <mesh key={component.keyComponent}>
                                <FactoryShapes entity={component} />
                            </mesh>
                        )
                    })}
                    <OrbitControls />
                </Canvas>
                :
                <div>
                    <ImportCadProjectButton className='btn button-primary btn-import' importAction={importModel} actionParams={{id: selectedProject?.name} as ImportActionParamsObject}>
                        <GiCubeforce style={{ width: "25px", height: "25px", marginRight: "5px" }} /> Import CAD
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
                        <GrCubes className="outlinerGroupIcon" />
                    </div>
                    <div className="col-10 text-start ps-0">
                        <h5 className="outlinerGroupTitle">Cube</h5>
                    </div>
                </div>
                <div className="row p-1 ps-5">
                    <div className="row">
                        <div className="col-2">
                            <GrCube className="outlinerGroupIcon" />
                        </div>
                        <div className="col-10 text-start">
                            <h6 className="outlinerGroupTitle">Part 1</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <GrCube className="outlinerGroupIcon" />
                        </div>
                        <div className="col-10 text-start">
                            <h6 className="outlinerGroupTitle">Part 2</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <GrCube className="outlinerGroupIcon" />
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