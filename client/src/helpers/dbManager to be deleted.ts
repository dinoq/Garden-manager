
import { IPlant, PlantFamily, PlantSunRequirements, PlantYear } from "./plant-types";

let plantsDB: Array<IPlant>;
const getPlantsDB = async (): Promise<Array<IPlant>> => {
    if (!plantsDB) {
        plantsDB = await (await fetch("http://localhost:3001/vegetable")).json();
        if (plantsDB) {
            plantsDB.forEach(plant => {
                plant.growingPeriod = (plant as any)["growing-period"];

                const getFirstPart = (str: string, character: string): number =>{
                    if(str.includes(character)){
                        return parseInt(str.substring(str.indexOf(character)));
                    }else{
                        return parseInt(str);
                    }
                }
                const betweenRowSpacingWithoutDash = getFirstPart(<string>(plant as any)["between-row-spacing"], "-").toString();
                const inRowSpacingWithoutDash = getFirstPart(<string>(plant as any)["in-row-spacing"], "-").toString();
                plant.betweenRowSpacing = getFirstPart(betweenRowSpacingWithoutDash, "/");
                console.log('plant.betweenRowSpacing: ', plant.betweenRowSpacing);
                plant.inRowSpacing = getFirstPart(inRowSpacingWithoutDash, "/");
                console.log('plant.inRowSpacing: ', plant.inRowSpacing);
                
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
