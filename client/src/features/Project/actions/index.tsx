import { PayloadAction } from "@reduxjs/toolkit";
import { IAppSlice } from "../../../store/reducers/AppSlice";

export const setProjectAction = (state: IAppSlice, action: PayloadAction<IAppSlice>) => {
    return state = {...state, ...action.payload};
}
export const setProjectNameAction = (state: IAppSlice, action: PayloadAction<string>) => {
    state.project.projectName = action.payload;
}
export const setLMTAction = (state: IAppSlice, action: PayloadAction<number>) => {
    state.project.lastModified = action.payload;
}
export const setProjectIDAction = (state: IAppSlice, action: PayloadAction<number>) => {
    state.project.projectID = action.payload;
}

export const projectActions = {
    setProjectAction,
    setProjectNameAction,
    setLMTAction,
    setProjectIDAction
}