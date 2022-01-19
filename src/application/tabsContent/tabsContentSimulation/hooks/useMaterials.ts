import {useEffect, useState} from "react";
import {Material} from "../../../../model/Material";
import {getMaterials} from "../api/materials_api";

export const useMaterials = () => {
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        getMaterials().then(res => setMaterials(res))
    }, []);

    return {materials}
}