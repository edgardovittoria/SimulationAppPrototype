import React, { FC, useEffect, useRef, useState } from 'react';
import { Canvas, Object3DNode, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { Color, Mesh, MeshPhongMaterial } from 'three';
import { OrbitControls, TransformControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import './modeler.css'
import { GiCubeforce } from "react-icons/gi";
import { Project } from '../../../../../../model/Project'
import { Port } from "../../../../../../model/Port";
import {
    FactoryShapes,
    ImportActionParamsObject,
    ImportCadProjectButton
} from '@Draco112358/cad-library'
import { findSelectedPort } from '../../../../../../store/projectSlice';


interface ModelerProps {
    selectedProject: Project | undefined,
    importModel: (params: ImportActionParamsObject) => any,
    selectComponent: Function,
    selectPort: Function,
    updatePortPosition: Function
}

export const Modeler: React.FC<ModelerProps> = (
    {
        selectedProject, importModel, selectComponent, selectPort, updatePortPosition
    }
) => {

    const [previousColor, setPreviousColor] = useState<Color>({} as Color);
    let selectedPort = findSelectedPort(selectedProject)

    return (
        <div className="d-flex justify-content-center">
            {(selectedProject && selectedProject.model.components) ?
                <Canvas style={{ width: "1156px", height: "800px" }}>
                    <pointLight position={[100, 100, 100]} intensity={0.8} />
                    <hemisphereLight color={'#ffffff'} groundColor={new THREE.Color('#b9b9b9')} position={[-7, 25, 13]}
                        intensity={0.85} />
                    {selectedProject.model.components.map(component => {
                        return (
                            <mesh
                                userData={{ keyComponent: component.keyComponent, isSelected: false }}
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
                                position={component.transformationParams.position}
                                scale={component.transformationParams.scale}
                                rotation={component.transformationParams.rotation}
                            >
                                <FactoryShapes entity={component} />
                            </mesh>
                        )
                    })}
                    {selectedProject.ports.map(port => {
                        return (
                            <>
                                <mesh
                                    key={port.inputElement.name}
                                    name={port.inputElement.name}
                                    position={port.inputElement.transformationParams.position}
                                    scale={port.inputElement.transformationParams.scale}
                                    rotation={port.inputElement.transformationParams.rotation}
                                    onClick={() => selectPort(port.name)}
                                >
                                    <FactoryShapes entity={port.inputElement} color="#00ff00" />
                                </mesh>
                                <mesh
                                    key={port.outputElement.name}
                                    name={port.outputElement.name}
                                    position={port.outputElement.transformationParams.position}
                                    scale={port.outputElement.transformationParams.scale}
                                    rotation={port.outputElement.transformationParams.rotation}
                                    onClick={() => selectPort(port.name)}
                                >
                                    <FactoryShapes entity={port.outputElement} />
                                </mesh>
                            </>
                        )
                    })}
                    {(selectedPort) && <PortControls
                        selectedPort={selectedPort}
                        selectPort={selectPort}
                        updatePortPosition={updatePortPosition}
                    />}
                </Canvas>
                :
                <div>
                    <ImportCadProjectButton className='btn button-primary btn-import' importAction={importModel}
                        actionParams={{ id: selectedProject?.name } as ImportActionParamsObject}>
                        <GiCubeforce style={{ width: "25px", height: "25px", marginRight: "5px" }} /> Import CAD
                    </ImportCadProjectButton>
                </div>
            }
        </div>
    )

}

interface PortControlsProps {
    selectedPort: Port | undefined,
    selectPort: Function,
    updatePortPosition: Function
}

const PortControls: FC<PortControlsProps> = (
    {
        selectedPort, selectPort, updatePortPosition
    }
) => {

    const transformationFirst = useRef(null);
    const transformationLast = useRef(null);
    const { scene } = useThree()




    useEffect(() => {
        if (transformationFirst.current) {
            const controls = transformationFirst.current as unknown as Object3DNode<any, any>;
            controls.addEventListener("dragging-changed", onChangeFirstPositionHandler)
            return () => controls.removeEventListener("dragging-changed", onChangeFirstPositionHandler)
        }
    })

    useEffect(() => {
        if (transformationLast.current) {
            const controls = transformationLast.current as unknown as Object3DNode<any, any>;
            controls.addEventListener("dragging-changed", onChangeLastPositionHandler)
            return () => controls.removeEventListener("dragging-changed", onChangeLastPositionHandler)
        }

    })


    function onChangeFirstPositionHandler(event: THREE.Event) {
        if (!event.value && transformationFirst.current) {
            const controls: Object3DNode<any, any> = transformationFirst.current as unknown as Object3DNode<any, any>
            let transformationParmas = {
                type: 'first',
                position: [controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z],
            }
            updatePortPosition(transformationParmas)
        }
    }

    function onChangeLastPositionHandler(event: THREE.Event) {
        if (!event.value && transformationLast.current) {
            const controls: Object3DNode<any, any> = transformationLast.current as unknown as Object3DNode<any, any>
            let transformationParmas = {
                type: 'last',
                position: [controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z],
            }
            updatePortPosition(transformationParmas)
        }
    }



    return (
        <>
            <TransformControls
                object={(selectedPort) && scene.getObjectByName((selectedPort as Port).inputElement.name)}
                ref={transformationFirst}
                position={(selectedPort) && (selectedPort as Port).inputElement.transformationParams.position}
                showX={(selectedPort) ? (selectedPort as Port).isSelected : false}
                showY={(selectedPort) ? (selectedPort as Port).isSelected : false}
                showZ={(selectedPort) ? (selectedPort as Port).isSelected : false}
            />
            <TransformControls
                object={(selectedPort) && scene.getObjectByName((selectedPort as Port).outputElement.name)}
                ref={transformationLast}
                position={(selectedPort) && (selectedPort as Port).outputElement.transformationParams.position}
                showX={(selectedPort) ? (selectedPort as Port).isSelected : false}
                showY={(selectedPort) ? (selectedPort as Port).isSelected : false}
                showZ={(selectedPort) ? (selectedPort as Port).isSelected : false}
            />
            <OrbitControls makeDefault />
            <GizmoHelper alignment="bottom-right" margin={[150, 80]}>
                <GizmoViewport axisColors={['red', '#40ff00', 'blue']} labelColor="white" />
            </GizmoHelper>
        </>
    )


}




