import { IPlant, PlantFamily, PlantSunRequirements, PlantYear } from "../helpers/plant-types";

const PlantsDB: Array<IPlant> = [
    {
        name: "Česnek",
        family: PlantFamily.Amaryllidaceae,
        position: PlantSunRequirements.UNKNOWN,
        year: PlantYear.UNKNOWN,
        inRowSpacing: 10,
        betweenRowSpacing: 20,
        icon: "cesnek.png",
    },
    {
        name: "Mrkev",
        family: PlantFamily.Amaryllidaceae,
        position: PlantSunRequirements.UNKNOWN,
        year: PlantYear.UNKNOWN,
        inRowSpacing: 10,
        betweenRowSpacing: 20,
        icon: "mrkev.png",
    },
]

export default PlantsDB;