import { PayloadAction } from "@reduxjs/toolkit";
import { IPlant, IVariety } from "../../../../helpers/plant-types";
import { IDesignSlice } from "..";
import { IInGround, IPosition } from "../../../../helpers/types";
import { ROWDIRECTIONS } from "../../../../features/DesignPanel/types";

export const changePlantAction = (state: IDesignSlice, action: PayloadAction<IPlant>) => {
    const actualPlantSection = state.objects.plantSections[state.objects.selectedPlantSectionID];
    actualPlantSection.plant = action.payload;
    actualPlantSection.variety = action.payload.varieties[0];
}

export const updateWidthAction = (state: IDesignSlice, action: PayloadAction<{ id: number, newWidth: number }>) => {
    const index = state.objects.plantSections.findIndex(plantSection => plantSection.id === action.payload.id);
    state.objects.plantSections[index].width = action.payload.newWidth;
}

export const updateHeightAction = (state: IDesignSlice, action: PayloadAction<{ id: number, newHeight: number }>) => {
    const index = state.objects.plantSections.findIndex(plantSection => plantSection.id === action.payload.id);
    state.objects.plantSections[index].height = action.payload.newHeight;
}

export const updatePositionAction = (state: IDesignSlice, action: PayloadAction<{ id: number, position: IPosition }>) => {
    const index = state.objects.plantSections.findIndex(plantSection => plantSection.id === action.payload.id);
    state.objects.plantSections[index].x = action.payload.position.x;
    state.objects.plantSections[index].y = action.payload.position.y;
}

export const updateSpacingAction = (state: IDesignSlice, action: PayloadAction<{ id: number, plantSpacing: number, rowSpacing: number }>) => {
    const index = state.objects.plantSections.findIndex(plantSection => plantSection.id === action.payload.id);
    state.objects.plantSections[index].rowSpacingMin = action.payload.rowSpacing;
    state.objects.plantSections[index].plantSpacingMin = action.payload.plantSpacing;
}

export const updateSelectedPlantSectionAction = (state: IDesignSlice, action: PayloadAction<number>) => {
    state.objects.selectedPlantSectionID = action.payload;
}

export const placePlantSectionAction = (state: IDesignSlice, action: PayloadAction<{ id: number, position: IPosition }>) => {
    const plantSectionID = action.payload.id;
    state.objects.plantSections[plantSectionID].isPlaced = true;
    state.objects.plantSections[plantSectionID].x = action.payload.position.x;
    state.objects.plantSections[plantSectionID].y = action.payload.position.y;
}

export const changeRowsDirectionAction = (state: IDesignSlice, action: PayloadAction<number>) => {
    const index = state.objects.plantSections.findIndex(plantSection => plantSection.id === action.payload);
    const currentDirection = state.objects.plantSections[index].rowsDirection;
    if (currentDirection === ROWDIRECTIONS.LEFT_TO_RIGHT) {
        state.objects.plantSections[index].rowsDirection = ROWDIRECTIONS.TOP_TO_DOWN;
    } else {
        state.objects.plantSections[index].rowsDirection = ROWDIRECTIONS.LEFT_TO_RIGHT;
    }
}

export const changeVarietyAction = (state: IDesignSlice, action: PayloadAction<IVariety>) => {
    const actualPlantSection = state.objects.plantSections[state.objects.selectedPlantSectionID];
    actualPlantSection.variety = action.payload;
}

export const createNewPlantSectionAction = (state: IDesignSlice, action: PayloadAction<{ position: IPosition, plant: IPlant }>) => {
    const id = state.objects.plantSections.length;
    const plant = action.payload.plant;
    const variety = (plant.varieties && plant.varieties.length) ? plant.varieties[0] : undefined;
    const width = plant.PlantSpacingMin ? plant.PlantSpacingMin : 50;
    const height = plant.RowSpacingMin ? plant.RowSpacingMin : 50;
    const inGround: IInGround = {
        yearRoundPlanting: false,
        from: { month: state.calendar.actualMonth, monthPart: 0 },
        to: { month: state.calendar.actualMonth + (plant.growingPeriod? Math.floor(plant.growingPeriod/30) : 3), monthPart: 0 }
    }
    const zIndex = state.objects.plantSections.length? Math.max(...state.objects.plantSections.map(obj => obj.zIndex)) + 1: 1; // Biggest zIndex + 1 or 1 if it is first PlantSection
    state.objects.plantSections.push({ id, variety, width, height, plant, ...action.payload.position, isPlaced: false, name: id.toString(), rowsDirection: ROWDIRECTIONS.LEFT_TO_RIGHT, inGround, zIndex })
    state.objects.selectedPlantSectionID = id;
}

export const setYearRoundPlanting = (state: IDesignSlice, action: PayloadAction<{ id: number, yearRoundPlanting: boolean }>) => {
    const plantSectionID = action.payload.id;
    const yearRoundPlanting = action.payload.yearRoundPlanting;
    state.objects.plantSections[plantSectionID].inGround.yearRoundPlanting = yearRoundPlanting;
}

export const setPlantSectionInGroundFromMonth = (state: IDesignSlice, action: PayloadAction<{ id: number, fromMonth: number }>) => {
    const plantSectionID = action.payload.id;
    const fromMonth = action.payload.fromMonth;
    state.objects.plantSections[plantSectionID].inGround.from.month = fromMonth;
}

export const setPlantSectionInGroundToMonth = (state: IDesignSlice, action: PayloadAction<{ id: number, fromMonth: number }>) => {
    const plantSectionID = action.payload.id;
    const toMonth = action.payload.fromMonth;
    state.objects.plantSections[plantSectionID].inGround.to.month = toMonth;
}

export const plantSectionActions = {
    changePlantAction,
    updateWidthAction,
    updateHeightAction,
    updatePositionAction,
    updateSpacingAction,
    updateSelectedPlantSectionAction,
    placePlantSectionAction,
    changeRowsDirectionAction,
    changeVarietyAction,
    createNewPlantSectionAction,
    setYearRoundPlanting,
    setPlantSectionInGroundFromMonth,
    setPlantSectionInGroundToMonth
}