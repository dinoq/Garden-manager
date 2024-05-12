import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectDialogStates } from "../../components/ProjectDialog";


interface IGUISlice {
    menuWidth: number,
    toolbarHeight: number,
    hideGUI: boolean,
    message: string;
    ProjectDialog: {
        show: boolean,
        state: ProjectDialogStates
    }
}
const initialState: IGUISlice = {
    menuWidth: 300,
    toolbarHeight: 150,
    hideGUI: false,
    message: "...",
    ProjectDialog: {
        show: false,
        state: ProjectDialogStates.OPEN_PROJECT
    }
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
        }
    }
})

export const { hideProjectDialog, showProjectDialog, setMessage } = GUISlice.actions;
export default GUISlice.reducer;