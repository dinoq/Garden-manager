
export enum PlantFamily{
    Amaryllidaceae = "Amarylkovité",
    UNKNOWN = "Neznámá čeleď"
}

export enum PlantSunRequirements{
    SUN,
    PARTIAL_SHADE,
    SHADOW,
    UNKNOWN
}

export enum PlantYear{
    FIRST,
    SECOND,
    THIRD,
    MULTI_YEAR,
    UNKNOWN
}

export interface IPlant {
    id: number,
    name: string,
    family: PlantFamily,
    position: PlantSunRequirements,
    year: PlantYear,
    inRowSpacing: number,
    betweenRowSpacing: number,
    icon: string,
    growing_season: number
}