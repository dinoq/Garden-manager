import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IViewNavigationSlice {
    zoom: number,
    position: {x: number, y: number},
    isMovingAppView: boolean
}

const initialState : IViewNavigationSlice = {
    zoom: 100,
    position: {
        x: 0,
        y: 0
    },
    isMovingAppView: false
}

const ViewNavigationSlice = createSlice(
    {
        name: "NavigationSlice",
        initialState,
        reducers: {
            zoomAction: (state: IViewNavigationSlice, action: PayloadAction<number>)=>{
                if(action.payload > 0 && state.zoom > 100){
                    state.zoom -= 10;
                }else if(action.payload < 0 && state.zoom < 200){
                    state.zoom += 10;
                }
            },

            setIsMovingAppViewAction: (state: IViewNavigationSlice, action: PayloadAction<boolean>) =>{
                state.isMovingAppView = action.payload;
            }

        }
    }
)

export const {zoomAction, setIsMovingAppViewAction } = ViewNavigationSlice.actions;
export default ViewNavigationSlice.reducer;