import {useEffect, useState} from "react";
import {Material} from "../../../../model/Material";
import {getMaterials} from "../api/materials_api";

export const useMaterials = () => {
    const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);

    useEffect(() => {
        getMaterials().then(res => setAvailableMaterials(res))
    }, []);

    return {availableMaterials}
}