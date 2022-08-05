import React, {useEffect, useState} from 'react';
import {Canvas} from "@react-three/fiber";
import * as THREE from 'three';
import {Color, Mesh, MeshPhongMaterial} from 'three';
import {OrbitControls, GizmoHelper, GizmoViewport, Line} from '@react-three/drei'
import {GiCubeforce} from "react-icons/gi";
import {Project} from '../../../../../../model/Project'
import {Probe} from "../../../../../../model/Port";
import {
    FactoryShapes,
    ImportActionParamsObject,
    ImportCadProjectButton, useFaunaQuery
} from 'cad-library'
import {findSelectedPort} from '../../../../../../store/projectSlice';
import {Screenshot} from "./components/Screenshot";
import {PortControls} from "./components/PortControls";
import {ProbeControls} from "./components/ProbeControls";
import {store} from "../../../../../../store/store";
import {updateFolderOrProject} from "../../../../../../faunadb/api/projectsFolderAPIs";

interface ModelerProps {
    selectedProject: Project | undefined,
    importModel: (params: ImportActionParamsObject) => any,
    selectComponent: Function,
    selectPort: Function,
    updatePortPosition: Function,
    setScreenshot: Function, 
    setShowLoadFromDBModal: Function
}

export const Modeler: React.FC<ModelerProps> = (
    {
        selectedProject, importModel, selectComponent, selectPort, updatePortPosition,
        setScreenshot, setShowLoadFromDBModal
    }
) => {

    const [previousColor, setPreviousColor] = useState<Color>({} as Color);
    let selectedPort = findSelectedPort(selectedProject)

    const {execQuery} = useFaunaQuery()

    /*
    * TODO: review this solution
    * problem: too many query to fauna db
    * */
    useEffect(() => {
        execQuery(updateFolderOrProject, store.getState().projects.projects).then(() => {})
    }, [(selectedProject) && selectedProject.model]);



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
                                position={component.transformationParams.position}
                                scale={component.transformationParams.scale}
                                rotation={component.transformationParams.rotation}
                            >
                                <FactoryShapes entity={component}/>
                            </mesh>
                        )
                    })}
                    {selectedProject.ports.map(port => {
                        return (
                            <>
                                {(port.category === 'port' || port.category === 'lumped') ?
                                    <>
                                        <mesh
                                            key={port.inputElement.name}
                                            name={port.inputElement.name}
                                            position={port.inputElement.transformationParams.position}
                                            scale={port.inputElement.transformationParams.scale}
                                            rotation={port.inputElement.transformationParams.rotation}
                                            onClick={() => selectPort(port.name)}
                                        >
                                            <FactoryShapes entity={port.inputElement} color="#00ff00"/>
                                        </mesh>

                                        <mesh
                                            key={port.outputElement.name}
                                            name={port.outputElement.name}
                                            position={port.outputElement.transformationParams.position}
                                            scale={port.outputElement.transformationParams.scale}
                                            rotation={port.outputElement.transformationParams.rotation}
                                            onClick={() => selectPort(port.name)}
                                        >
                                            <FactoryShapes entity={port.outputElement}/>
                                        </mesh>
                                        <Line
                                            points={[port.inputElement.transformationParams.position, port.outputElement.transformationParams.position]}
                                            color={(port.category === 'port') ? 'red' : 'violet'}
                                            lineWidth={1} alphaWrite={undefined}                                      />
                                    </> :
                                    <>
                                        <group
                                            name={port.name}
                                            onClick={() => selectPort(port.name)}
                                            position={(port as Probe).groupPosition}
                                        >
                                            {(port as Probe).elements.map((element, index) => {
                                                return (
                                                    <mesh
                                                        key={index}
                                                        position={element.transformationParams.position}
                                                        scale={element.transformationParams.scale}
                                                        rotation={element.transformationParams.rotation}
                                                    >
                                                        <FactoryShapes entity={element} color="orange"/>
                                                    </mesh>
                                                )
                                            })}
                                        </group>
                                    </>
                                }

                            </>
                        )
                    })}
                    {(selectedPort && (selectedPort.category === 'port' || selectedPort.category === 'lumped')) &&
                        <PortControls selectedPort={selectedPort} updatePortPosition={updatePortPosition}/>
                    }
                    {selectedPort && selectedPort.category === 'probe' &&
                        <ProbeControls selectedProbe={selectedPort as Probe} updateProbePosition={updatePortPosition}/>
                    }
                    <OrbitControls makeDefault/>
                    <GizmoHelper alignment="bottom-right" margin={[150, 80]}>
                        <GizmoViewport axisColors={['red', '#40ff00', 'blue']} labelColor="white"/>
                    </GizmoHelper>
                    <Screenshot selectedProject={selectedProject} setScreenshot={setScreenshot}/>
                </Canvas>
                :
                <div className="position-absolute top-50 w-25 d-flex justify-content-between">
                    <ImportCadProjectButton className='btn button-primary '
                                            importAction={importModel}
                                            actionParams={{id: selectedProject?.name} as ImportActionParamsObject}>
                        <GiCubeforce style={{width: "25px", height: "25px", marginRight: "5px"}}/> Import From FS
                    </ImportCadProjectButton>
                    <span className="border-start border-dark"/>
                    <button className='btn button-primary' onClick={() => setShowLoadFromDBModal(true)}>
                        <GiCubeforce style={{width: "25px", height: "25px", marginRight: "5px"}}/> Import From DB
                    </button>
                </div>
            }
        </div>
    )

}
