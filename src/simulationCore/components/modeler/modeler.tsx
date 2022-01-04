import React, { useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'
import './modeler.css'
import { GrCubes, GrCube } from "react-icons/gr";
import { GiCubeforce } from "react-icons/gi";
import { Project } from "../../../model/Project";
import { FactoryShapes, importActionParamsObject, importFromCadProject } from '@Draco112358/cad-library';
import { useDispatch } from 'react-redux';

interface ModelerProps {
    selectedProject: Project | undefined,
    importModel: (params: importActionParamsObject) => any,
    selectProject: Function
}

export const Modeler: React.FC<ModelerProps> = (
    { selectedProject, importModel, selectProject }
) => {

    const dispatch = useDispatch()
    const inputRefProject = useRef(null)

    const onImportProjectClick = () => {
        let input = inputRefProject.current
        if (input) {
            (input as HTMLInputElement).click()
        }

    };

    return (
        <>
            {(selectedProject && selectedProject.model.components !== undefined) ?
                <Canvas style={{ width: "1836px", height: "800px" }}>
                    <pointLight position={[100, 100, 100]} intensity={0.8} />
                    <hemisphereLight color={'#ffffff'} groundColor={new THREE.Color('#b9b9b9')} position={[-7, 25, 13]}
                        intensity={0.85} />
                    {selectedProject.model.components.map(component => {
                        console.log(component)
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
                    <button className="btn button-primary btn-import" onClick={onImportProjectClick}>
                        <GiCubeforce style={{ width: "25px", height: "25px", marginRight: "5px" }} /> Import CAD
                        <input
                            type="file"
                            ref={inputRefProject}
                            style={{ display: "none" }}
                            accept="application/json"
                            onChange={(e) => {
                                let files = e.target.files;
                                (files) && importFromCadProject(files[0], dispatch, importModel, {id: selectedProject?.name} as importActionParamsObject)
                            }} />
                    </button>
                </div>
            }
        </>
    )

}

/*TODO: refactor: move model outliner into another component and create css file for style*/

interface ModelOutlinerProps {
}

export const ModelOutliner: React.FC<ModelOutlinerProps> = ({ }) => {
    return (
        <>
            <div className='col mt-4'>
                <div className="row ps-2">
                    <div className="col-2">
                        <GrCubes className="outlinerGroupIcon" />
                    </div>
                    <div className="col-10 text-start">
                        <h6 className="outlinerGroupTitle">Cube</h6>
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