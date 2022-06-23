import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IGUISlice{
    menubarWidth: number,
    toolbarHeight: number
}
const initialState: IGUISlice = {
    menubarWidth: 250,
    toolbarHeight: 150
}

const GUISlice = createSlice({
    name: "GUISlice",
    initialState,
    reducers: {
    }
})

export const {} = GUISlice.actions;
export default GUISlice.reducer;