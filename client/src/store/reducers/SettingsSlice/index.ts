import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { settingsAutosaveActions, settingsCalendarActions } from "./actions";
import { DEFAULT_AUTOSAVE_FREQUENCY, monthPartsCountType } from "./types";


export interface ISettingsSlice {
    calendar: {
        monthPartsCount: monthPartsCountType;
    },
    autosave: {
        enabled: boolean,
        frequency: number // Frequency in seconds
    }
}
export const initialState: ISettingsSlice = {
    calendar: {
        monthPartsCount: 4
    },
    autosave: {
        enabled: true,
        frequency: DEFAULT_AUTOSAVE_FREQUENCY
    }
}

const SettingsSlice = createSlice({
    name: "SettingsSlice",
    initialState,
    reducers: {
        hydrate: (state: ISettingsSlice, action: PayloadAction<ISettingsSlice>) => {
            state = action.payload;
        },
        ...settingsAutosaveActions,
        ...settingsCalendarActions
    }
})

export const settingsActions = SettingsSlice.actions;
export default SettingsSlice.reducer;