import { PayloadAction } from "@reduxjs/toolkit";
import { IDesignSlice } from "..";

export const setProjectAction = (state: IDesignSlice, action: PayloadAction<IDesignSlice>) => {
    return state = {...state, ...action.payload};
}
export const setProjectNameAction = (state: IDesignSlice, action: PayloadAction<string>) => {
    state.project.projectName = action.payload;
}
export const setLMTAction = (state: IDesignSlice, action: PayloadAction<number>) => {
    state.project.lastModified = action.payload;
}
export const setProjectIDAction = (state: IDesignSlice, action: PayloadAction<number>) => {
    state.project.projectID = action.payload;
}

export const projectActions = {
    setProjectAction,
    setProjectNameAction,
    setLMTAction,
    setProjectIDAction
}