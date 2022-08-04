import {useEffect, useState} from "react";
import {ComponentEntity} from "cad-library";
import {generateSTLListFromComponents, getMaterialListFrom} from "./auxiliaryFunctions/auxiliaryFunctions";

export const useGenerateMesh = (
    showSimulationModel: boolean, components: ComponentEntity[], quantumDimensions: [number, number, number]
) => {
    const [meshGenerated, setMeshGenerated] = useState(false);
    const [mesherOutput, setMesherOutput] = useState(undefined);

    useEffect(() => {
        let objToSendToMesher = {
            STLList: (components) && generateSTLListFromComponents(getMaterialListFrom(components), components),
            quantum: quantumDimensions
        }
        //TODO: add http request to generate mesh and set mesherOutput

        console.log(objToSendToMesher)
    }, [meshGenerated]);

    return {meshGenerated, setMeshGenerated, mesherOutput}

}