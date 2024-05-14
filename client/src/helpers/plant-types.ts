
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

export enum GrowthType{
    REGULAR_THIRD,
    FIRST_TWO_THIRD,
    LAST_THIRD,
    UNKNOWN
}

export interface IPlantDB{
    ["growth-type"]: string
}

export interface IPlant extends IPlantDB{
    id: number,
    name: string,
    family: PlantFamily,
    varieties: IVariety[],
    position: PlantSunRequirements,
    year: PlantYear,
    PlantSpacingStr: string | null,
    PlantSpacingMin: number,
    RowSpacingStr: string | null,
    RowSpacingMin: number,
    icon: string,
    growingPeriod: number,
    growthType: GrowthType
}

export interface IVariety {
    id_variety: number,
    name: string,
    crop: number,
    PlantSpacingStr: string | null,
    PlantSpacingMin: number,
    RowSpacingStr: string | null,
    RowSpacingMin: number,
}