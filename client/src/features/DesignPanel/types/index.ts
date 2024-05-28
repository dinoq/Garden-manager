import { IPlant, IVariety } from "../../../helpers/plant-types";
import { IAppObject, IInGround } from "../../../helpers/types";

export enum ROWDIRECTIONS{
    LEFT_TO_RIGHT,
    TOP_TO_DOWN
}

export interface IPlantSection extends IAppObject{
    plant: IPlant,
    variety?: IVariety,
    plantSpacingMin?: number,
    rowSpacingMin?: number,
    isPlaced: boolean,
    rowsDirection: ROWDIRECTIONS;
    inGround: IInGround
}