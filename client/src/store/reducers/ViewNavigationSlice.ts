import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlant } from "../../helpers/plant-types";
import { IPosition } from "../../helpers/types";

interface IViewNavigationSlice {
    zoom: number,
    position: IPosition,
    isMovingAppView: boolean,
    isPuttingSeedBedOfType: IPlant | undefined,
    mouseDownPosition: IPosition
}

const initialState: IViewNavigationSlice = {
    zoom: 1,
    position: {
        x: -1000,
        y: -1000
    },
    isMovingAppView: false,
    isPuttingSeedBedOfType: undefined,
    mouseDownPosition: {x: 0, y: 0}
}

const ViewNavigationSlice = createSlice(
    {
        name: "NavigationSlice",
        initialState,
        reducers: {
            zoomAction: (state: IViewNavigationSlice, action: PayloadAction<number>) => {
                let a = 160;
                if (action.payload > 0 && state.zoom > 1) {
                    state.zoom -= 0.1;
                    state.position.x += a;
                    state.position.y += a;
                } else if (action.payload < 0 && state.zoom < 5) {
                    state.zoom += 0.1;
                    state.position.x -= a;
                    state.position.y -= a;
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
            },
            setMouseDownPosition: (state: IViewNavigationSlice, action: PayloadAction<IPosition>) => {
                state.mouseDownPosition = action.payload;
            },

        }
    }
)

export const { zoomAction, moveWorldByMouseAction, setIsMovingAppViewAction, setIsPuttingSeedBedOfTypeAction, setMouseDownPosition } = ViewNavigationSlice.actions;
export default ViewNavigationSlice.reducer;