import { useEffect, useState } from "react";
import { processPlants } from "../helpers/functions";
import useDB from "./useDB";
import { IPlant } from "../helpers/plant-types";
const usePlantsFromDB = () => {
    const {data: plantsFromDB, dataLoaded: plantsFetched} = useDB("crop");
    const {data: varietiesFromDB, dataLoaded: varietiesFetched} = useDB("variety");
    const [processedPlants, setProcessedPlants] = useState<IPlant[]>([]);

    useEffect(()=>{
        if(plantsFetched && varietiesFetched && !processedPlants.length){
            const a = processPlants(plantsFromDB, varietiesFromDB);
            setProcessedPlants(a);
        }
    }, [plantsFetched, varietiesFetched]) // TODO add if fetched changed

    return processedPlants;
}

export default usePlantsFromDB;