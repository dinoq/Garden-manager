import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IGUISlice{
    menuWidth: number,
    toolbarHeight: number,
    hideGUI: boolean
}
const initialState: IGUISlice = {
    menuWidth: 300,
    toolbarHeight: 150,
    hideGUI: false
}

const GUISlice = createSlice({
    name: "GUISlice",
    initialState,
    reducers: {
    }
})

export const {} = GUISlice.actions;
export default GUISlice.reducer;