import { RootState } from "../../..";

export const calendarSelector = (state: RootState) => state.designReducer.calendar;
export const actualYearSelector = (state: RootState) => state.designReducer.calendar.actualYear;
export const actualMonthSelector = (state: RootState) => state.designReducer.calendar.actualMonth;
export const actualMonthPartSelector = (state: RootState) => state.designReducer.calendar.actualMonthPart;
export const showAllMonthsSelector = (state: RootState) => state.designReducer.calendar.showAllMonths;

export const seedBedsSelector = (state: RootState) => state.designReducer.objects.seedBeds;
export const isSeedBedSelectedSelector = (state: RootState, id: number) => state.designReducer.objects.selectedSeedBedID === id;
export const seedBedSelector = (state: RootState, id: number) => state.designReducer.objects.seedBeds[id];
export const selectedSeedBedSelector = (state: RootState) => state.designReducer.objects.seedBeds[state.designReducer.objects.selectedSeedBedID];
export const selectedSeedBedIDSelector = (state: RootState) => state.designReducer.objects.selectedSeedBedID;

export const projectNameSelector = (state: RootState) => state.designReducer.project.projectName;
export const projectIDSelector = (state: RootState) => state.designReducer.project.projectID;
export const lastModifiedSelector = (state: RootState) => state.designReducer.project.lastModified;