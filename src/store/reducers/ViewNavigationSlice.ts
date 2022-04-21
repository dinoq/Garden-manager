import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlant } from "../../helpers/plant-types";
import { IPosition } from "../../helpers/types";

interface IViewNavigationSlice {
    zoom: number,
    position: IPosition,
    isMovingAppView: boolean,
    isPuttingSeedBedOfType: IPlant | undefined
}

const initialState: IViewNavigationSlice = {
    zoom: 100,
    position: {
        x: 0,
        y: 0
    },
    isMovingAppView: false,
    isPuttingSeedBedOfType: undefined
}

const ViewNavigationSlice = createSlice(
    {
        name: "NavigationSlice",
        initialState,
        reducers: {
            zoomAction: (state: IViewNavigationSlice, action: PayloadAction<number>) => {
                if (action.payload > 0 && state.zoom > 100) {
                    state.zoom -= 10;
                } else if (action.payload < 0 && state.zoom < 200) {
                    state.zoom += 10;
                }
            },
            moveWorldByMouseAction: (state: IViewNavigationSlice, action: PayloadAction<IPosition>) => {
                state.position = action.payload;
            },

            setIsMovingAppViewAction: (state: IViewNavigationSlice, action: PayloadAction<boolean>) => {
                state.isMovingAppView = action.payload;
            },

            setIsPuttingSeedBedOfTypeAction: (state: IViewNavigationSlice, action: PayloadAction<IPlant | undefined>) => {
                state.isPuttingSeedBedOfType = action.payload;
            }

        }
    }
)

export const { zoomAction, moveWorldByMouseAction, setIsMovingAppViewAction, setIsPuttingSeedBedOfTypeAction } = ViewNavigationSlice.actions;
export default ViewNavigationSlice.reducer;