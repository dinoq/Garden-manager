import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ICalendarSlice{
    actualYear: number,
    actualMonth: number,
    actualQuarter: number
}
const initialState: ICalendarSlice = {
    actualYear: new Date().getFullYear(),
    actualMonth: 0,
    actualQuarter: 0
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
        setQuarterAction: (state: ICalendarSlice, action: PayloadAction<number>)=>{
            state.actualQuarter = action.payload;
        },
    }
})

export const {setYearAction, setMonthAction, setQuarterAction} = CalendarSlice.actions;
export default CalendarSlice.reducer;