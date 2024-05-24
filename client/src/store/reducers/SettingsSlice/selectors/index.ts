import { RootState } from "../../..";

export const monthPartsCountSelector = (state: RootState) => state.settingsReducer.calendar.monthPartsCount;
export const autosaveEnabledSelector = (state: RootState) => state.settingsReducer.autosave.enabled;
export const autosaveFrequencySelector = (state: RootState) => state.settingsReducer.autosave.frequency;