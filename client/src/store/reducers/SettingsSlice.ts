import { createSlice } from "@reduxjs/toolkit";


interface ISettingsSlice {
    calendar: {
        monthPartCounts: 2 | 4;
    }
}
const initialState: ISettingsSlice = {
    calendar: {
        monthPartCounts: 4
    }
}

const SettingsSlice = createSlice({
    name: "SettingsSlice",
    initialState,
    reducers: {
    }
})

export const {  } = SettingsSlice.actions;
export default SettingsSlice.reducer;