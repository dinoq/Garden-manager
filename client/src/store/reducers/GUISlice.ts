import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ProjectDialogStates {
    OPEN_PROJECT,
    SAVE_PROJECT
}

interface IGUISlice {
    menuWidth: number,
    toolbarHeight: number,
    hideGUI: boolean,
    message: string;
    ProjectDialog: {
        show: boolean,
        state: ProjectDialogStates
    },
    selectedTab: number
}
const initialState: IGUISlice = {
    menuWidth: 300,
    toolbarHeight: 150,
    hideGUI: true,
    message: "...",
    ProjectDialog: {
        show: false,
        state: ProjectDialogStates.OPEN_PROJECT
    },
    selectedTab: 0
}

const GUISlice = createSlice({
    name: "GUISlice",
    initialState,
    reducers: {
        hideProjectDialog: (state: IGUISlice) => {
            state.ProjectDialog.show = false;
        },
        showProjectDialog: (state: IGUISlice, action: PayloadAction<boolean>) => {
            let showInput = action.payload;
            state.ProjectDialog = {
                show: true,
                state: showInput? ProjectDialogStates.SAVE_PROJECT : ProjectDialogStates.OPEN_PROJECT
            }
        },
        setMessage: (state: IGUISlice, action: PayloadAction<string>) => {
            //state.message = action.payload;
        },
        changeTabAction: (state: IGUISlice, action: PayloadAction<number>) => {
            state.selectedTab = action.payload;
        }
    }
})

export const { hideProjectDialog, showProjectDialog, setMessage, changeTabAction } = GUISlice.actions;
export default GUISlice.reducer;