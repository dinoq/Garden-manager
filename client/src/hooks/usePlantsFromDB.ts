import { useEffect, useState } from "react";
import { processPlants } from "../helpers/functions";
import useDB from "./useDB";

const usePlantsFromDB = () => {
    const plantsFromDB = useDB("vegetable");
    const [processedPlants, setProcessedPlants] = useState<any>([]);
    useEffect(()=>{
        setProcessedPlants(processPlants(plantsFromDB));
    }, [plantsFromDB])

    return processedPlants;
}

export default usePlantsFromDB;