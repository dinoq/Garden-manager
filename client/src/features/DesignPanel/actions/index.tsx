import { PayloadAction } from "@reduxjs/toolkit";
import { IPlant, IVariety } from "../../../helpers/plant-types";
import { IAppSlice } from "../../../store/reducers/AppSlice";
import { IInGround, IPosition } from "../../../helpers/types";
import { ROWDIRECTIONS } from "../types";

export const changePlantAction = (state: IAppSlice, action: PayloadAction<IPlant>) => {
    const actualSeedbed = state.objects.seedBeds[state.objects.selectedSeedBedID];
    actualSeedbed.plant = action.payload;
    actualSeedbed.variety = action.payload.varieties[0];
}

export const updateWidthAction = (state: IAppSlice, action: PayloadAction<{ id: number, newWidth: number }>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
    state.objects.seedBeds[index].width = action.payload.newWidth;
}

export const updateHeightAction = (state: IAppSlice, action: PayloadAction<{ id: number, newHeight: number }>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
    state.objects.seedBeds[index].height = action.payload.newHeight;
}

export const updatePositionAction = (state: IAppSlice, action: PayloadAction<{ id: number, position: IPosition }>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
    state.objects.seedBeds[index].x = action.payload.position.x;
    state.objects.seedBeds[index].y = action.payload.position.y;
}

export const updateSpacingAction = (state: IAppSlice, action: PayloadAction<{ id: number, plantSpacing: number, rowSpacing: number }>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
    state.objects.seedBeds[index].rowSpacingMin = action.payload.rowSpacing;
    state.objects.seedBeds[index].plantSpacingMin = action.payload.plantSpacing;
}

export const updateSelectedSeedBedAction = (state: IAppSlice, action: PayloadAction<number>) => {
    state.objects.selectedSeedBedID = action.payload;
}

export const placeSeedBedAction = (state: IAppSlice, action: PayloadAction<{ id: number, position: IPosition }>) => {
    const seedBedID = action.payload.id;
    state.objects.seedBeds[seedBedID].isPlaced = true;
    state.objects.seedBeds[seedBedID].x = action.payload.position.x;
    state.objects.seedBeds[seedBedID].y = action.payload.position.y;
}

export const changeRowsDirectionAction = (state: IAppSlice, action: PayloadAction<number>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload);
    const currentDirection = state.objects.seedBeds[index].rowsDirection;
    if (currentDirection === ROWDIRECTIONS.LEFT_TO_RIGHT) {
        state.objects.seedBeds[index].rowsDirection = ROWDIRECTIONS.TOP_TO_DOWN;
    } else {
        state.objects.seedBeds[index].rowsDirection = ROWDIRECTIONS.LEFT_TO_RIGHT;
    }
}

export const changeVarietyAction = (state: IAppSlice, action: PayloadAction<IVariety>) => {
    const actualSeedbed = state.objects.seedBeds[state.objects.selectedSeedBedID];
    actualSeedbed.variety = action.payload;
}

export const createNewSeedBedAction = (state: IAppSlice, action: PayloadAction<{ position: IPosition, plant: IPlant }>) => {
    const id = state.objects.seedBeds.length;
    const plant = action.payload.plant;
    const variety = (plant.varieties && plant.varieties.length) ? plant.varieties[0] : undefined;
    const width = plant.PlantSpacingMin ? plant.PlantSpacingMin : 50;
    const height = plant.RowSpacingMin ? plant.RowSpacingMin : 50;
    const inGround: IInGround = {
        yearRound: true,
        from: { month: 0, monthPart: 0 },
        to: { month: 0, monthPart: 0 }
    }
    state.objects.seedBeds.push({ id, variety, width, height, plant, ...action.payload.position, isPlaced: false, name: id.toString(), rowsDirection: ROWDIRECTIONS.LEFT_TO_RIGHT, inGround })
    state.objects.selectedSeedBedID = id;
}

export const seedBedActions = {
    changePlantAction,
    updateWidthAction,
    updateHeightAction,
    updatePositionAction,
    updateSpacingAction,
    updateSelectedSeedBedAction,
    placeSeedBedAction,
    changeRowsDirectionAction,
    changeVarietyAction,
    createNewSeedBedAction
}