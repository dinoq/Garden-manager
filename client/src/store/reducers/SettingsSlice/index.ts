import { createSlice } from "@reduxjs/toolkit";
import DBManager from "../../../helpers/DBManager";
import { settingsAutosaveActions, settingsCalendarActions } from "./actions";
import { DEFAULT_AUTOSAVE_FREQUENCY, monthPartsCountType } from "./types";


export interface ISettingsSlice {
    calendar: {
        monthPartsCount: monthPartsCountType;
    },
    autosave:{
        enabled: boolean,
        frequency: number // Frequency in seconds
    }
}
export const settingsInitialState: ISettingsSlice = {
    calendar: {
        monthPartsCount: 4
    },
    autosave:{
        enabled: true,
        frequency: DEFAULT_AUTOSAVE_FREQUENCY
    }
}

const SettingsSlice = createSlice({
    name: "SettingsSlice",
    initialState: DBManager.getSettings(),
    reducers: {
        ...settingsAutosaveActions,
        ...settingsCalendarActions
    }
})

export const settingsActions = SettingsSlice.actions;
export default SettingsSlice.reducer;