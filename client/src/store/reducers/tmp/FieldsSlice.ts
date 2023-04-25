import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IField, IPosition, IDimensions } from "../../../helpers/types";
interface IFIeldSlice extends IField{

}

const initialState: Array<IFIeldSlice> = [
]

const FieldSlice = createSlice({
    name: "FieldSlice",
    initialState,
    reducers: {
        createNewFieldAction: (state: Array<IField>, action: PayloadAction<{position: IPosition, dimensions: IDimensions}>) => {
            const id = state.length;
            let { position: pos, dimensions: dim }= action.payload;
            
            state.push({id, width: dim.width, height: dim.height, x: pos.x, y: pos.y, name: id.toString()})
        },
        /*updateWidthAction: (state: Array<IAppObject>, action: PayloadAction<{ id: number, newWidth: number }>) => {
            const index = state.findIndex(seedBed => seedBed.id === action.payload.id);
            state[index].width = action.payload.newWidth;
        },
        updateHeightAction: (state: Array<IAppObject>, action: PayloadAction<{ id: number, newHeight: number }>) => {
            const index = state.findIndex(seedBed => seedBed.id === action.payload.id);
            state[index].height = action.payload.newHeight;
        },
        updatePositionAction: (state: Array<IAppObject>, action: PayloadAction<{ id: number, position: IPosition }>) => {
            const index = state.findIndex(seedBed => seedBed.id === action.payload.id);
            state[index].x = action.payload.position.x;
            state[index].y = action.payload.position.y;
        },
        placeSeedBedAction: (state: Array<IAppObject>, action: PayloadAction<{id: number, position: IPosition}>) => {
            const seedBedID = action.payload.id;
            state[seedBedID].isPlaced = true;
            state[seedBedID].x = action.payload.position.x;
            state[seedBedID].y = action.payload.position.y;
        }*/
    }
})

export const { createNewFieldAction } = FieldSlice.actions;
export default FieldSlice.reducer;