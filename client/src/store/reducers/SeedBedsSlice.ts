import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlant } from "../../helpers/plant-types";
import { IPosition, ISeedBed } from "../../helpers/types";

interface ISeedBedSlice extends ISeedBed{

}

const initialState: Array<ISeedBedSlice> = [
]

const SeedBedsSlice = createSlice({
    name: "SeedBedsSlice",
    initialState,
    reducers: {
        updateWidthAction: (state: Array<ISeedBed>, action: PayloadAction<{ id: number, newWidth: number }>) => {
            const index = state.findIndex(seedBed => seedBed.id === action.payload.id);
            state[index].width = action.payload.newWidth;
        },
        updateHeightAction: (state: Array<ISeedBed>, action: PayloadAction<{ id: number, newHeight: number }>) => {
            const index = state.findIndex(seedBed => seedBed.id === action.payload.id);
            state[index].height = action.payload.newHeight;
        },
        updatePositionAction: (state: Array<ISeedBed>, action: PayloadAction<{ id: number, position: IPosition }>) => {
            const index = state.findIndex(seedBed => seedBed.id === action.payload.id);
            state[index].x = action.payload.position.x;
            state[index].y = action.payload.position.y;
        },
        createNewSeedBedAction: (state: Array<ISeedBed>, action: PayloadAction<{position: IPosition, plant: IPlant}>) => {
            const id = state.length;
            state.push({id, width: 50, height: 50, plant: action.payload.plant, ...action.payload.position, isPlaced: false})
        }
    }
})

export const { updateWidthAction, updateHeightAction, updatePositionAction, createNewSeedBedAction } = SeedBedsSlice.actions;
export default SeedBedsSlice.reducer;