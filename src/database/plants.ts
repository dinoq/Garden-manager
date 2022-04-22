import { IPlant, PlantFamily, PlantSunRequirements, PlantTrack } from "../helpers/plant-types";

const PlantsDB: Array<IPlant> = [
    {
        name: "Česnek",
        family: PlantFamily.Amaryllidaceae,
        sun: PlantSunRequirements.UNKNOWN,
        track: PlantTrack.UNKNOWN,
        inRowSpacing: 10,
        betweenRowSpacing: 20,
        icon: "cesnek.png",
    },
    {
        name: "Mrkev",
        family: PlantFamily.Amaryllidaceae,
        sun: PlantSunRequirements.UNKNOWN,
        track: PlantTrack.UNKNOWN,
        inRowSpacing: 10,
        betweenRowSpacing: 20,
        icon: "mrkev.png",
    },
]

export default PlantsDB;