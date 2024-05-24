import { PayloadAction } from "@reduxjs/toolkit";
import { IPlant, IVariety } from "../../../../helpers/plant-types";
import { IDesignSlice } from "..";
import { IInGround, IPosition } from "../../../../helpers/types";
import { ROWDIRECTIONS } from "../../../../features/DesignPanel/types";

export const changePlantAction = (state: IDesignSlice, action: PayloadAction<IPlant>) => {
    const actualSeedbed = state.objects.seedBeds[state.objects.selectedSeedBedID];
    actualSeedbed.plant = action.payload;
    actualSeedbed.variety = action.payload.varieties[0];
}

export const updateWidthAction = (state: IDesignSlice, action: PayloadAction<{ id: number, newWidth: number }>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
    state.objects.seedBeds[index].width = action.payload.newWidth;
}

export const updateHeightAction = (state: IDesignSlice, action: PayloadAction<{ id: number, newHeight: number }>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
    state.objects.seedBeds[index].height = action.payload.newHeight;
}

export const updatePositionAction = (state: IDesignSlice, action: PayloadAction<{ id: number, position: IPosition }>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
    state.objects.seedBeds[index].x = action.payload.position.x;
    state.objects.seedBeds[index].y = action.payload.position.y;
}

export const updateSpacingAction = (state: IDesignSlice, action: PayloadAction<{ id: number, plantSpacing: number, rowSpacing: number }>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
    state.objects.seedBeds[index].rowSpacingMin = action.payload.rowSpacing;
    state.objects.seedBeds[index].plantSpacingMin = action.payload.plantSpacing;
}

export const updateSelectedSeedBedAction = (state: IDesignSlice, action: PayloadAction<number>) => {
    state.objects.selectedSeedBedID = action.payload;
}

export const placeSeedBedAction = (state: IDesignSlice, action: PayloadAction<{ id: number, position: IPosition }>) => {
    const seedBedID = action.payload.id;
    state.objects.seedBeds[seedBedID].isPlaced = true;
    state.objects.seedBeds[seedBedID].x = action.payload.position.x;
    state.objects.seedBeds[seedBedID].y = action.payload.position.y;
}

export const changeRowsDirectionAction = (state: IDesignSlice, action: PayloadAction<number>) => {
    const index = state.objects.seedBeds.findIndex(seedBed => seedBed.id === action.payload);
    const currentDirection = state.objects.seedBeds[index].rowsDirection;
    if (currentDirection === ROWDIRECTIONS.LEFT_TO_RIGHT) {
        state.objects.seedBeds[index].rowsDirection = ROWDIRECTIONS.TOP_TO_DOWN;
    } else {
        state.objects.seedBeds[index].rowsDirection = ROWDIRECTIONS.LEFT_TO_RIGHT;
    }
}

export const changeVarietyAction = (state: IDesignSlice, action: PayloadAction<IVariety>) => {
    const actualSeedbed = state.objects.seedBeds[state.objects.selectedSeedBedID];
    actualSeedbed.variety = action.payload;
}

export const createNewSeedBedAction = (state: IDesignSlice, action: PayloadAction<{ position: IPosition, plant: IPlant }>) => {
    const id = state.objects.seedBeds.length;
    const plant = action.payload.plant;
    const variety = (plant.varieties && plant.varieties.length) ? plant.varieties[0] : undefined;
    const width = plant.PlantSpacingMin ? plant.PlantSpacingMin : 50;
    const height = plant.RowSpacingMin ? plant.RowSpacingMin : 50;
    const inGround: IInGround = {
        yearRoundPlanting: false,
        from: { month: state.calendar.actualMonth, monthPart: 0 },
        to: { month: state.calendar.actualMonth + (plant.growingPeriod? Math.floor(plant.growingPeriod/30) : 3), monthPart: 0 }
    }
    const zIndex = state.objects.seedBeds.length? Math.max(...state.objects.seedBeds.map(obj => obj.zIndex)) + 1: 1; // Biggest zIndex + 1 or 1 if it is first seedBed
    state.objects.seedBeds.push({ id, variety, width, height, plant, ...action.payload.position, isPlaced: false, name: id.toString(), rowsDirection: ROWDIRECTIONS.LEFT_TO_RIGHT, inGround, zIndex })
    state.objects.selectedSeedBedID = id;
}

export const setYearRoundPlanting = (state: IDesignSlice, action: PayloadAction<{ id: number, yearRoundPlanting: boolean }>) => {
    const seedBedID = action.payload.id;
    const yearRoundPlanting = action.payload.yearRoundPlanting;
    state.objects.seedBeds[seedBedID].inGround.yearRoundPlanting = yearRoundPlanting;
}

export const setSeedbedInGroundFromMonth = (state: IDesignSlice, action: PayloadAction<{ id: number, fromMonth: number }>) => {
    const seedBedID = action.payload.id;
    const fromMonth = action.payload.fromMonth;
    state.objects.seedBeds[seedBedID].inGround.from.month = fromMonth;
}

export const setSeedbedInGroundToMonth = (state: IDesignSlice, action: PayloadAction<{ id: number, fromMonth: number }>) => {
    const seedBedID = action.payload.id;
    const toMonth = action.payload.fromMonth;
    state.objects.seedBeds[seedBedID].inGround.to.month = toMonth;
}

export const plantSectionActions = {
    changePlantAction,
    updateWidthAction,
    updateHeightAction,
    updatePositionAction,
    updateSpacingAction,
    updateSelectedSeedBedAction,
    placeSeedBedAction,
    changeRowsDirectionAction,
    changeVarietyAction,
    createNewSeedBedAction,
    setYearRound: setYearRoundPlanting,
    setSeedbedInGroundFromMonth,
    setSeedbedInGroundToMonth
}