
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

export enum PlantTrack{
    FIRST,
    SECOND,
    THIRD,
    MULTI_YEAR,
    UNKNOWN
}

export interface IPlant {
    name: string,
    family: PlantFamily,
    sun: PlantSunRequirements,
    track: PlantTrack,
    inRowSpacing: number,
    betweenRowSpacing: number,
    icon: string

}