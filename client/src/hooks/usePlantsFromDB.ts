import { useEffect, useState } from "react";
import { processPlants } from "../helpers/functions";
import useDB from "./useDB";

const usePlantsFromDB = () => {
    const plantsFromDB = useDB("crop");
    const varietiesFromDB = useDB("variety");
    const [processedPlants, setProcessedPlants] = useState<any>([]);
    useEffect(()=>{
        setProcessedPlants(processPlants(plantsFromDB, varietiesFromDB));
    }, [plantsFromDB])

    return processedPlants;
}

export default usePlantsFromDB;