import React, {useEffect, useMemo, useState} from 'react';
import {Canvas} from "@react-three/fiber";
import {GizmoHelper, GizmoViewport, OrbitControls, TransformControls} from "@react-three/drei";
import {Simulation} from "../../../../../../../../model/Simulation";
import {Material} from "cad-library";
import css
    from "../../../dashBoard/rightPanelSimulation/factory/components/portManagement/components/portPosition/portPosition.module.css";
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";
import {MesherOutput} from "../../../../../../../../model/MesherInputOutput";
import {MyInstancedMesh} from "./components/MyInstancedMesh";
import * as THREE from "three";
import {TabsContainer} from "../../../../../../../tabsContainer/TabsContainer";
import {MesherOutputSelector, MeshGeneratedSelector} from "../../../../../../../../store/mesherSlice";

interface PanelContentProps {
    mesherOutput: MesherOutput
}

export const MeshedElement: React.FC<PanelContentProps> = (
    {
        mesherOutput
    }
) => {

    const selectedProject = useSelector(selectedProjectSelector)
    const meshGenerated = useSelector(MeshGeneratedSelector)



    let materialsList: Material[] = []
    selectedProject?.model?.components.forEach(c => materialsList.push(c.material as Material))

    const [mesherMatrices, setMesherMatrices] = useState<boolean[][][][]>([]);


    useEffect(() => {
        if (mesherOutput) {
            let matrices: boolean[][][][] = []
            Object.values(mesherOutput.mesher_matrices).forEach(matrix => {
                matrices.push(matrix)
            })
            setMesherMatrices(matrices)


        }
    }, [mesherOutput, meshGenerated]);


    if(meshGenerated === "Generated"){
        return (
            <TransformControls>
                <group>
                    {mesherOutput && mesherMatrices.map((matrix, index) => {
                        return (
                            <MyInstancedMesh
                                mesherOutput={mesherOutput}
                                mesherMatrices={mesherMatrices}
                                index={index}
                                materialsList={materialsList}
                            />
                        )
                    })}
                </group>
            </TransformControls>
        )
    }else{
        return <></>
    }



}