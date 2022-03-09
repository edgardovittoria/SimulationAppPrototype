import React from 'react';
import {Canvas} from "@react-three/fiber";
import * as THREE from "three";
import {OrbitControls} from "@react-three/drei";
import {Simulation} from "../../../../../../../../model/Simulation";
import {FactoryShapes} from "@Draco112358/cad-library";
import {Project} from "../../../../../../../../model/Project";

interface PanelContentProps {
    simulationStarted: 'notStarted' | 'started' | 'Completed',
    meshGenerated: boolean,
    simulation: Simulation,
    selectedProject: Project | undefined
}

export const PanelContent: React.FC<PanelContentProps> = (
    {
        simulationStarted, meshGenerated, simulation, selectedProject
    }
) => {

    return (
        <div className="col-9 simulationPanelContent p-4">
            <div className="row">
                <div className="col-6">Name</div>
                <div className="col-6">Status</div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-6 fw-bold">{(simulation) && simulation.name}</div>
                <div className="col-6">
                    {simulationStarted === 'started' && 'Started'}
                    {simulationStarted === 'notStarted' && 'Not Started'}
                    {simulationStarted === 'Completed' && 'Completed'}
                </div>
            </div>
            <div className="row mt-5 mb-5">
                {(meshGenerated && simulationStarted !== 'started') &&
                <Canvas style={{height: "400px"}}>
                    <pointLight position={[100, 100, 100]} intensity={0.8}/>
                    <hemisphereLight color={'#ffffff'} groundColor={new THREE.Color('#b9b9b9')}
                                     position={[-7, 25, 13]}
                                     intensity={0.85}/>
                    {/*TODO: show mesh that return the server*/}
                    {selectedProject && selectedProject.model.components.map(component => {
                        return (
                            <mesh
                                onUpdate={(mesh) => {
                                    mesh.material = new THREE.MeshPhongMaterial({
                                        color: component.material?.color,
                                        wireframe: true
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
                    <OrbitControls/>
                </Canvas>
                }
            </div>
        </div>
    )

}