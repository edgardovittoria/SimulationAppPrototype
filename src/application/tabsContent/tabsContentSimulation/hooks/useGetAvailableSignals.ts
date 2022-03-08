import {useEffect, useState} from "react";
import {Signal} from "../../../../model/Port";
import {getSignals} from "../api/signals_api";

export const useGetAvailableSignals = () => {
    const [availableSignals, setAvailableSignals] = useState<Signal[]>([]);
    useEffect(() => {
        getSignals().then(res => {
            setAvailableSignals(res)
        })
    }, []);

    return {
        availableSignals: availableSignals
    }
}