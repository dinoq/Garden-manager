import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ICalendarSlice{
    actualYear: number,
    actualMonth: number,
    actualMonthPart: number,
    showAllMonths: boolean
}
const initialState: ICalendarSlice = {
    actualYear: new Date().getFullYear(),
    actualMonth: 0,
    actualMonthPart: 0,
    showAllMonths: false
}

const CalendarSlice = createSlice({
    name: "CalendarSlice",
    initialState,
    reducers: {
        setYearAction: (state: ICalendarSlice, action: PayloadAction<number>)=>{
            state.actualYear = action.payload;
        },
        setMonthAction: (state: ICalendarSlice, action: PayloadAction<number>)=>{
            state.actualMonth = action.payload;
        },
        setMonthPartAction: (state: ICalendarSlice, action: PayloadAction<number>)=>{
            state.actualMonthPart = action.payload;
        },
        setShowAllMonthsAction: (state: ICalendarSlice, action: PayloadAction<boolean>)=>{
            state.showAllMonths = action.payload;
        },
    }
})

export const {setYearAction, setMonthAction, setMonthPartAction, setShowAllMonthsAction} = CalendarSlice.actions;
export default CalendarSlice.reducer;