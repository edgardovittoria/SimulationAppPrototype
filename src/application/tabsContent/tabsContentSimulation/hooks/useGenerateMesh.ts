import {useEffect, useState} from "react";
import {ComponentEntity} from "cad-library";
import {generateSTLListFromComponents, getMaterialListFrom} from "./auxiliaryFunctions/auxiliaryFunctions";
import axios from "axios";
import {MesherOutput} from "../../../../model/MesherInputOutput";
import {exportJson} from "../../../../importExport/exportFunctions";

export const useGenerateMesh = (
    showSimulationModel: boolean, components: ComponentEntity[], quantumDimensions: [number, number, number]
) => {
    const [meshGenerated, setMeshGenerated] = useState<"Not Generated" | "Generating" | "Generated">("Not Generated");
    const [mesherOutput, setMesherOutput] = useState<MesherOutput | undefined>(undefined);

    useEffect(() => {
        if(meshGenerated === "Generating"){
            let objToSendToMesher = {
                STLList: (components) && generateSTLListFromComponents(getMaterialListFrom(components), components),
                quantum: quantumDimensions
            }
            //TODO: add http request to generate mesh and set mesherOutput
            axios.get('http://localhost:3001/mesherOutput').then(res => {
                setMesherOutput(res.data)
            })
            //exportJson(objToSendToMesher)
            //console.log(objToSendToMesher)

            setTimeout(() => {
                setMeshGenerated("Generated")
            }, 5000)
        }

    }, [meshGenerated]);

    return {meshGenerated, setMeshGenerated, mesherOutput}

}