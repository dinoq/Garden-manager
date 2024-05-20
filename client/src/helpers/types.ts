import { ROWDIRECTIONS } from "../components/DesignPanel/SeedBed/Plant";
import { IPlant, IVariety } from "./plant-types";

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
    variety?: IVariety,
    plantSpacingMin?: number,
    rowSpacingMin?: number,
    isPlaced: boolean,
    rowsDirection: ROWDIRECTIONS;
    inGround: IInGround
}

export interface IField extends IAppObject{
    id: number, 
}

export type IRect = IDimensions & IPosition;

export enum Direction {
    HORIZONTAL,
    VERTICAL
}

export type IInGround = {
    yearRound: boolean,
    from: {month: number, monthPart: number},
    to: {month: number, monthPart: number}
}