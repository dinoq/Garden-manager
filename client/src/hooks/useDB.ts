import { useEffect, useRef, useState } from "react";
import { consoleError, consoleWarn } from "../helpers/functions";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { setDBDataAction, setFetchedAction } from "../store/reducers/DBSlice";
import { dbSelector } from "../store/reducers/DBSlice/selectors";

const useDB = (query: string) => {
    const dispatch = useAppDispatch();
    const cache = useAppSelector(dbSelector);
    const currentCache = cache[query];
    const [data, setData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if(currentCache?.data){
            setData(currentCache.data);
            setDataLoaded(true);
        }
    }, [cache])

    useEffect(() => {
        if (currentCache?.fetched) {
            return;
        }
        dispatch(setFetchedAction(query));
        const getDBData = async () => {

            const dbData = await (await fetch("http://localhost:3001/" + query)).json();
            if (dbData) {
                dbData.forEach((dbEntry: any) => {
                    consoleWarn("edit dbEntry type to interface");
                    Object.entries(dbEntry).forEach(([key, val]) => {
                        if (key.includes("-")) {
                            let nameParts = key.split("-");
                            let newKey = nameParts.map((part, index) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
                            dbEntry[newKey] = val;
                        }
                    })
                })
                dispatch(setDBDataAction({ path: query, data: dbData }))
            }
        }

        getDBData();

    }, [])

    return {data, dataLoaded};
}

export default useDB;