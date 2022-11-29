import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IGUISlice{
    menuWidth: number,
    toolbarHeight: number,
    hideGUI: boolean
}
const initialState: IGUISlice = {
    menuWidth: 250,
    toolbarHeight: 150,
    hideGUI: true
}

const GUISlice = createSlice({
    name: "GUISlice",
    initialState,
    reducers: {
    }
})

export const {} = GUISlice.actions;
export default GUISlice.reducer;