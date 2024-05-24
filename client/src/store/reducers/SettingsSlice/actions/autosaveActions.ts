import { PayloadAction } from "@reduxjs/toolkit";
import { ISettingsSlice } from "..";
import { DEFAULT_AUTOSAVE_FREQUENCY } from "../types";

const autosaveToggleEnabled = (state: ISettingsSlice, action: PayloadAction<void>) => {
    state.autosave.enabled = !state.autosave.enabled;
}

const updateFrequency = (state: ISettingsSlice, action: PayloadAction<string>) => {
    const freq = parseInt(action.payload) || DEFAULT_AUTOSAVE_FREQUENCY;
    state.autosave.frequency = freq;
}

export const settingsAutosaveActions = {
    autosaveToggleEnabled,
    updateFrequency
}