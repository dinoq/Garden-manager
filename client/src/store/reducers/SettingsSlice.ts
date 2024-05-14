import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type monthPartsCountType = 1 | 2 | 4;

interface ISettingsSlice {
    calendar: {
        monthPartsCount: monthPartsCountType;
    }
}
const initialState: ISettingsSlice = {
    calendar: {
        monthPartsCount: 4
    }
}

const SettingsSlice = createSlice({
    name: "SettingsSlice",
    initialState,
    reducers: {
        setMonthPartsCountAction: (state: ISettingsSlice, action: PayloadAction<monthPartsCountType>) => {
            state.calendar.monthPartsCount = action.payload;
        }
    }
})

export const { setMonthPartsCountAction } = SettingsSlice.actions;
export default SettingsSlice.reducer;