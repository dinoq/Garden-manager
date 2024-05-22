import { RootState } from "../../../store";

export const actualYearSelector = (state: RootState) => state.appReducer.calendar.actualYear;
export const actualMonthSelector = (state: RootState) => state.appReducer.calendar.actualMonth;
export const actualMonthPartSelector = (state: RootState) => state.appReducer.calendar.actualMonthPart;
export const showAllMonthsSelector = (state: RootState) => state.appReducer.calendar.showAllMonths;

export const monthPartsCountSelector = (state: RootState) => state.settingsReducer.calendar.monthPartsCount;

export const toolBarMinimizedSelector = (state: RootState) => state.guiReducer.toolbarMinimized;
export const toolbarHeightSelector = (state: RootState) => state.guiReducer.toolbarHeight;