import { useEffect, useRef, useState } from "react";
import { consoleError, consoleWarn } from "../helpers/functions";

const useDB = (query: string) => {
    const [data, setData] = useState([]);
    const cache = useRef<any>({});
    consoleWarn("edit cache type to interface");
    
    useEffect(() => {
        if(cache.current[query] !== undefined){
            consoleWarn("todo");
        }
        const getDBData = async () => {
            console.log('______________________________getDBData______________________________');
            const dbData = await (await fetch("http://localhost:3001/" + query)).json();
            if (dbData) {
                dbData.forEach((dbEntry: any) => {
                    consoleWarn("edit dbEntry type to interface");
                    Object.entries(dbEntry).forEach(([key, val])=>{
                        if(key.includes("-")){
                            let nameParts = key.split("-");
                            let newKey = nameParts.map((part, index)=> index === 0? part: part.charAt(0).toUpperCase() + part.slice(1)).join("");
                            dbEntry[newKey] = val;
                        }
                    })
                })
                setData(dbData);
            }
        }

        getDBData();
    
    }, [])
    
    return data;
}

export default useDB;