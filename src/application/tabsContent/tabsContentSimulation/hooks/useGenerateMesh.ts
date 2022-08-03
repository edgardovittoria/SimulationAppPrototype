import {useEffect, useState} from "react";

export const useGenerateMesh = (showSimulationModel: boolean) => {
    const [meshGenerated, setMeshGenerated] = useState(false);
    useEffect(() => {
        /*if(showSimulationModel){
            setTimeout(() => {
                //TODO: add request to the server to do meshing and manage response
                setMeshGenerated(true)
            }, 5000)
        }*/
    }, [meshGenerated, showSimulationModel]);

    return {meshGenerated, setMeshGenerated}

}