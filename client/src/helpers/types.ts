import { ROWDIRECTIONS } from "../components/SeedBed/Plant";
import { IPlant } from "./plant-types";

export interface IDimensions{
    width: number,
    height: number
}

export interface IPosition{
    x: number,
    y: number
}

export interface IAppObject extends IDimensions, IPosition{
    id: number,
    name: string
}

export interface ISeedBed extends IAppObject{
    id: number, 
    plant: IPlant,
    isPlaced: boolean,
    rowsDirection: ROWDIRECTIONS;
}

export interface IField extends IAppObject{
    id: number, 
}

export type IRect = IDimensions & IPosition;

export enum Direction {
    HORIZONTAL,
    VERTICAL
}