import { ActionCreatorWithPayload, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISeedBedProps } from "../../components/SeedBed";


const initialState: Array<ISeedBedProps> = [

]

const SeedBedsSlice = createSlice({
    name: "SeedBedsSlice",
    initialState,
    reducers: {
        updateWidth: (state: Array<ISeedBedProps>, action: PayloadAction<{id: number, newWidth: number}> )=>{
            const index = state.findIndex(seedBed=>seedBed.id == action.payload.id);
            state[index].width = action.payload.newWidth;
        },
        updateHeight: (state: Array<ISeedBedProps>, action: PayloadAction<{id: number, newHeight: number}> )=>{
            const index = state.findIndex(seedBed=>seedBed.id == action.payload.id);
            state[index].width = action.payload.newHeight;
        }
    }
})

export const {} = SeedBedsSlice.actions;
export default SeedBedsSlice.reducer;