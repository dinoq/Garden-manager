import { PayloadAction } from "@reduxjs/toolkit";
import { IAppSlice } from "../../../store/reducers/AppSlice";

const setYearAction = (state: IAppSlice, action: PayloadAction<number>)=>{
    state.calendar.actualYear = action.payload;
}
const setMonthAction = (state: IAppSlice, action: PayloadAction<number>)=>{
    state.calendar.actualMonth = action.payload;
}
const setMonthPartAction = (state: IAppSlice, action: PayloadAction<number>)=>{
    state.calendar.actualMonthPart = action.payload;
}
const setShowAllMonthsAction = (state: IAppSlice, action: PayloadAction<boolean>)=>{
    state.calendar.showAllMonths = action.payload;
}

export const calendarActions = {
    setYearAction,
    setMonthAction,
    setMonthPartAction,
    setShowAllMonthsAction
}