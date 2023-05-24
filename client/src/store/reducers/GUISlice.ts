import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IGUISlice {
    menuWidth: number,
    toolbarHeight: number,
    hideGUI: boolean,
    showOpenProjectDialog: boolean
}
const initialState: IGUISlice = {
    menuWidth: 300,
    toolbarHeight: 150,
    hideGUI: false,
    showOpenProjectDialog: true
}

const GUISlice = createSlice({
    name: "GUISlice",
    initialState,
    reducers: {
        hideOpenProjectDialog: (state: IGUISlice) => {
            state.showOpenProjectDialog = false;
        }
    }
})

export const { hideOpenProjectDialog } = GUISlice.actions;
export default GUISlice.reducer;