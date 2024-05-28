import { RootState } from "../../..";

export const calendarSelector = (state: RootState) => state.designReducer.calendar;
export const actualYearSelector = (state: RootState) => state.designReducer.calendar.actualYear;
export const actualMonthSelector = (state: RootState) => state.designReducer.calendar.actualMonth;
export const actualMonthPartSelector = (state: RootState) => state.designReducer.calendar.actualMonthPart;
export const showAllMonthsSelector = (state: RootState) => state.designReducer.calendar.showAllMonths;

export const plantSectionsSelector = (state: RootState) => state.designReducer.objects.plantSections;
export const isPlantSectionSelectedSelector = (state: RootState, id: number) => state.designReducer.objects.selectedPlantSectionID === id;
export const plantSectionSelector = (state: RootState, id: number) => state.designReducer.objects.plantSections[id];
export const selectedPlantSectionSelector = (state: RootState) => state.designReducer.objects.plantSections[state.designReducer.objects.selectedPlantSectionID];
export const selectedPlantSectionIDSelector = (state: RootState) => state.designReducer.objects.selectedPlantSectionID;

export const projectNameSelector = (state: RootState) => state.designReducer.project.projectName;
export const projectIDSelector = (state: RootState) => state.designReducer.project.projectID;
export const lastModifiedSelector = (state: RootState) => state.designReducer.project.lastModified;