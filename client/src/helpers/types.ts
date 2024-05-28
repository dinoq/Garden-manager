import { ROWDIRECTIONS } from "../features/DesignPanel/types";
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
    name: string,
    zIndex: number
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
    yearRoundPlanting: boolean,
    from: {month: number, monthPart: number},
    to: {month: number, monthPart: number}
}