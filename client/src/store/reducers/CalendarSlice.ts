import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ICalendarSlice{
    actualYear: number,
    actualMonth: number,
    actualQuarter: number
}
const initialState: ICalendarSlice = {
    actualYear: new Date().getFullYear(),
    actualMonth: 1,
    actualQuarter: 1
}

const CalendarSlice = createSlice({
    name: "CalendarSlice",
    initialState,
    reducers: {
        setYear: (state: ICalendarSlice, action: PayloadAction<number>)=>{
            state.actualYear = action.payload;
        },
        setMonth: (state: ICalendarSlice, action: PayloadAction<number>)=>{
            state.actualMonth = action.payload;
        },
        setQuarter: (state: ICalendarSlice, action: PayloadAction<number>)=>{
            state.actualQuarter = action.payload;
        },
    }
})

export const {setYear, setMonth, setQuarter} = CalendarSlice.actions;
export default CalendarSlice.reducer;