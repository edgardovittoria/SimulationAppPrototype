import React from 'react';
import {Canvas} from "@react-three/fiber";
import * as THREE from 'three';
import {OrbitControls} from '@react-three/drei'
import './modeler.css'
import {GrCubes, GrCube} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {importModel, selectedProjectSelector, selectProject} from "../../../store/projectSlice";
import {GiCubeforce} from "react-icons/gi";

interface ModelerProps {
}

export const Modeler: React.FC<ModelerProps> = () => {

    const selectedProject = useSelector(selectedProjectSelector)
    const dispatch = useDispatch()

    return (
        <>
            {(selectedProject && selectedProject.model !== "") ?
                <Canvas style={{width: "1836px", height: "700px"}}>
                    <pointLight position={[100, 100, 100]} intensity={0.8}/>
                    <hemisphereLight color={'#ffffff'} groundColor={new THREE.Color('#b9b9b9')} position={[-7, 25, 13]}
                                     intensity={0.85}/>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2, 2, 2]}/>
                        <meshPhongMaterial color={"#5b9a71"}/>
                    </mesh>
                    <OrbitControls/>
                </Canvas>
                :
                <div>
                    <button className="btn button-primary btn-import"
                            onClick={() => {
                                if(selectedProject){
                                    dispatch(importModel({name: selectedProject.name, model: 'test'}))
                                    dispatch(selectProject(selectedProject.name))
                                }
                            }
                            }>
                        <GiCubeforce style={{width: "25px", height: "25px", marginRight: "5px"}}/> Import CAD
                    </button>
                </div>
            }
        </>
    )

}

{/*TODO: refactor: move model outliner into another component and create css file for style*/
}

interface ModelOutlinerProps {
}

export const ModelOutliner: React.FC<ModelOutlinerProps> = ({}) => {
    return (
        <>
            <div className='col mt-4'>
                <div className="row ps-2">
                    <div className="col-2">
                        <GrCubes className="outlinerGroupIcon"/>
                    </div>
                    <div className="col-10 text-start">
                        <h6 className="outlinerGroupTitle">Cube</h6>
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