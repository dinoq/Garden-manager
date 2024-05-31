import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ProjectDialogStates {
    OPEN_PROJECT,
    SAVE_PROJECT
}

interface IGUISlice {
    menuWidth: number,
    toolbarHeight: number,
    toolbarMinimized: boolean,
    tabBarHeight: number,
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
    toolbarHeight: 0,//150,
    toolbarMinimized: false,
    tabBarHeight: 0,//50,
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
        hideProjectDialogAction: (state: IGUISlice) => {
            state.ProjectDialog.show = false;
        },
        setShowProjectDialogAction: (state: IGUISlice, action: PayloadAction<boolean>) => {
            let showInput = action.payload;
            state.ProjectDialog = {
                show: true,
                state: showInput? ProjectDialogStates.SAVE_PROJECT : ProjectDialogStates.OPEN_PROJECT
            }
        },
        setMessageAction: (state: IGUISlice, action: PayloadAction<string>) => {
            //state.message = action.payload;
        },
        changeTabAction: (state: IGUISlice, action: PayloadAction<number>) => {
            state.selectedTab = action.payload;
        }
    }
})

export const { hideProjectDialogAction, setShowProjectDialogAction, setMessageAction: setMessage, changeTabAction } = GUISlice.actions;
export default GUISlice.reducer;