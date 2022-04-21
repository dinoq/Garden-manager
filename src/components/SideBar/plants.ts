import { IPlant, PlantFamily, PlantSunRequirements, PlantTrack } from "../../helpers/plant-types";


export const getPlantByName = (name: string): IPlant | undefined => {
    return PlantsDB.find(plant => plant.name === name) || undefined;
}


export const getPlantsByPartName = (partName: string): Array<IPlant> => {
    if(partName === undefined || partName.length === 0)
        return PlantsDB.sort((a, b) => (a.name > b.name ? -1 : 1))

    partName = partName.toLocaleLowerCase();
    const plants: Array<IPlant> = PlantsDB.filter(plant => {return plant.name.toLocaleLowerCase().includes(partName)}); //"exact" match first
    PlantsDB.forEach(plant =>{
        let chars = [...new Set(partName)];
        if(chars.every(char=>plant.name.toLocaleLowerCase().includes(char)) && !plants.includes(plant)){
            plants.push(plant);
        }
    })
    return plants;
}

const PlantsDB: Array<IPlant> = [
    {
        name: "Česnek 2",
        family: PlantFamily.Amaryllidaceae,
        sun: PlantSunRequirements.UNKNOWN,
        track: PlantTrack.UNKNOWN,
        inRowSpacing: 10,
        betweenRowSpacing: 20,
        icon: "a.png",
    },
    {
        name: "Česnek",
        family: PlantFamily.Amaryllidaceae,
        sun: PlantSunRequirements.UNKNOWN,
        track: PlantTrack.UNKNOWN,
        inRowSpacing: 10,
        betweenRowSpacing: 20,
        icon: "",
    },
    {
        name: "Z Česnek",
        family: PlantFamily.Amaryllidaceae,
        sun: PlantSunRequirements.UNKNOWN,
        track: PlantTrack.UNKNOWN,
        inRowSpacing: 10,
        betweenRowSpacing: 20,
        icon: "",
    },
    {
        name: "Česnek 5",
        family: PlantFamily.Amaryllidaceae,
        sun: PlantSunRequirements.UNKNOWN,
        track: PlantTrack.UNKNOWN,
        inRowSpacing: 10,
        betweenRowSpacing: 20,
        icon: "",
    }
]