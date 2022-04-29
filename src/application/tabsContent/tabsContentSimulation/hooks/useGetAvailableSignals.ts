import {useEffect, useState} from "react";
import {Signal} from "../../../../model/Port";
import {getSignals} from "../../../../faunadb/api/signalsAPIs";

export const useGetAvailableSignals = () => {
    const [availableSignals, setAvailableSignals] = useState<Signal[]>([]);
    useEffect(() => {
        getSignals().then(res => {
            setAvailableSignals(res)
        })
    }, []);

    return {
        availableSignals: availableSignals,
        setAvailableSignals: setAvailableSignals
    }
}