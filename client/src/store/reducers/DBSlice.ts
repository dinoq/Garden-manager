import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IDBSlice{
    db: {[key:string]: {fetched: boolean, data: any}}
}


const initialState: IDBSlice = {
    db: {}
}

const DBSlice = createSlice({
    initialState,
    name: "DBSlice",
    reducers: {
        setDBDataAction: (state: IDBSlice, action: PayloadAction<{path: string, data: any}>) => {
            state.db[action.payload.path].data = action.payload.data;
        },
        setFetchedAction: (state: IDBSlice, action: PayloadAction<string>) => {
            state.db[action.payload] = {fetched: true, data: null}
        },
    }
})

export const { setDBDataAction, setFetchedAction } = DBSlice.actions;
export default DBSlice.reducer;