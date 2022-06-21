
import { IPlant, PlantFamily, PlantSunRequirements, PlantYear } from "../../helpers/plant-types";

const getPlantsDB= async ()=> await (await fetch("http://localhost:3001/vegetable")).json();

export const getPlantByName = async (name: string): Promise<IPlant | undefined> => {
    let PlantsDB = await getPlantsDB();
    return PlantsDB;
}


export const getPlantsByPartName = async (partName: string): Promise<Array<IPlant>> => {
    let PlantsDB = await getPlantsDB();
    if(partName === undefined || partName.length === 0)
        return PlantsDB.sort((a: any, b: any) => (a.name > b.name ? -1 : 1))

    partName = partName.toLocaleLowerCase();
    const plants: Array<IPlant> = PlantsDB.filter((plant: any) => {return plant.name.toLocaleLowerCase().includes(partName)}); //"exact" match first
    PlantsDB.forEach((plant: any) =>{
        let chars = [...new Set(partName)];
        if(chars.every(char=>plant.name.toLocaleLowerCase().includes(char)) && !plants.includes(plant)){
            plants.push(plant);
        }
    })
    return plants;
}
