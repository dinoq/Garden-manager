import { RootState } from "../../../store";

export const projectNameSelector = (state: RootState) => state.appReducer.project.projectName;
export const projectIDSelector = (state: RootState) => state.appReducer.project.projectID;
export const lastModifiedSelector = (state: RootState) => state.appReducer.project.lastModified;