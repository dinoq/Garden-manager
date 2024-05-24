import { PayloadAction } from "@reduxjs/toolkit";
import { IDesignSlice } from "../../../store/reducers/DesignSlice";

const setYearAction = (state: IDesignSlice, action: PayloadAction<number>)=>{
    state.calendar.actualYear = action.payload;
}
const setMonthAction = (state: IDesignSlice, action: PayloadAction<number>)=>{
    state.calendar.actualMonth = action.payload;
}
const setMonthPartAction = (state: IDesignSlice, action: PayloadAction<number>)=>{
    state.calendar.actualMonthPart = action.payload;
}
const setShowAllMonthsAction = (state: IDesignSlice, action: PayloadAction<boolean>)=>{
    state.calendar.showAllMonths = action.payload;
}

export const calendarActions = {
    setYearAction,
    setMonthAction,
    setMonthPartAction,
    setShowAllMonthsAction
}