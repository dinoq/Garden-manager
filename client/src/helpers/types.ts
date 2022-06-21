import { IPlant } from "./plant-types";

export interface IDimensions{
    width: number,
    height: number
}

export interface IPosition{
    x: number,
    y: number
}


export interface ISeedBed extends IDimensions, IPosition{
    id: number, 
    plant: IPlant
}

export type IRect = IDimensions & IPosition;

export enum Direction {
    HORIZONTAL,
    VERTICAL
}