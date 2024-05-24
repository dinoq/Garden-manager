import { PayloadAction } from "@reduxjs/toolkit";
import { ISettingsSlice } from "..";
import { monthPartsCountType } from "../types";

const setMonthPartsCountAction = (state: ISettingsSlice, action: PayloadAction<monthPartsCountType>) => {
    state.calendar.monthPartsCount = action.payload;
}

export const settingsCalendarActions = {
    setMonthPartsCountAction
}
