
import { IPlant, PlantFamily, PlantSunRequirements, PlantYear } from "../../helpers/plant-types";

let plantsDB: Array<IPlant>;
const getPlantsDB = async (): Promise<Array<IPlant>> => {
    if (!plantsDB) {
        plantsDB = await (await fetch("http://localhost:3001/vegetable")).json();
        if (plantsDB) {
            plantsDB.forEach(plant => {
                plant.betweenRowSpacing = (plant as any)["between-row-spacing"];
                plant.growingPeriod = (plant as any)["growing-period"];
                plant.inRowSpacing = (plant as any)["in-row-spacing"];
            })
        }
    }
    return plantsDB;
}

export const getPlantByName = async (name: string): Promise<IPlant | undefined> => {
    let PlantsDB = await getPlantsDB();
    return PlantsDB.find((plant) => plant.name == name);
}


export const getPlantsByPartName = async (partName: string): Promise<Array<IPlant>> => {
    let PlantsDB = await getPlantsDB();
    if (partName === undefined || partName.length === 0)
        return PlantsDB.sort((a: any, b: any) => (a.name > b.name ? -1 : 1))

    partName = partName.toLocaleLowerCase();
    const plants: Array<IPlant> = PlantsDB.filter((plant: any) => { return plant.name.toLocaleLowerCase().includes(partName) }); //"exact" match first
    PlantsDB.forEach((plant: any) => {
        let chars = [...new Set(partName)];
        if (chars.every(char => plant.name.toLocaleLowerCase().includes(char)) && !plants.includes(plant)) {
            plants.push(plant);
        }
    })
    return plants;
}
