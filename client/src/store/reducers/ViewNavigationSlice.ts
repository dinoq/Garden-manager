import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlant } from "../../helpers/plant-types";
import { IPosition } from "../../helpers/types";

interface IViewNavigationSlice {
    zoom: number,
    position: IPosition,
    isMovingAppView: boolean,
    mouseDownStartPosition: IPosition,
    worldWidth: number,
    worldHeight: number
}

const initialState: IViewNavigationSlice = {
    zoom: 1,
    position: {
        x: 0,
        y: 0
    },
    isMovingAppView: false,
    mouseDownStartPosition: { x: 0, y: 0 },
    worldWidth: 4000,
    worldHeight: 4000
}

const ViewNavigationSlice = createSlice(
    {
        name: "NavigationSlice",
        initialState,
        reducers: {
            zoomAction: (state: IViewNavigationSlice, action: PayloadAction<{ zoomDirection: number, menuWidth: number }>) => {
                const zoomDirection = action.payload.zoomDirection;
                const menubarWidth = action.payload.menuWidth;

                let halfOfVisibleAppViewX = (window.innerWidth - menubarWidth) / 2 + menubarWidth;
                console.log('halfOfVisibleAppViewX: ', halfOfVisibleAppViewX);
                let centerOfAppViewX = state.position.x - halfOfVisibleAppViewX;
                console.log('CenterOfAppViewX: ', centerOfAppViewX);

                console.log('state.zoom: ', state.zoom);
                if (zoomDirection > 0 && state.zoom >= 0.5) { // zoom out
                    state.zoom -= 0.1;
                    /*state.zoom *= 0.5;
                    let a = 1600 * state.zoom;
                    let newX = state.position.x + a;


                    let newY = state.position.y + a;
                    if (newX < 0)
                        state.position.x = centerOfAppViewX;
                    else
                        state.position.x = 0
                    if (newY < 0)
                        state.position.y = newY;
                    else
                        state.position.y = 0*/
                        state.position.x = 0
                        state.position.y = 0
                } else if (zoomDirection < 0 && state.zoom < 1.5) { // zoom in
                    state.zoom += 0.1;
                    /*let newStred = centerOfAppViewX + (state.worldWidth * 0.1 * (centerOfAppViewX / state.worldWidth));
                    state.position.x = -(centerOfAppViewX - newStred) *1;*/
                        state.position.x = 0
                        state.position.y = 0
                    
                } else {
                    console.log('ERR state.zoom: ', state.zoom);
                    console.log('ERR zoomDirection: ', zoomDirection);
                }
            },

            moveWorldByMouseAction: (state: IViewNavigationSlice, action: PayloadAction<IPosition>) => {
                state.position = action.payload;
            },

            setIsMovingAppViewAction: (state: IViewNavigationSlice, action: PayloadAction<boolean>) => {
                state.isMovingAppView = action.payload;
            },

            setMouseDownPosition: (state: IViewNavigationSlice, action: PayloadAction<IPosition>) => {
                state.mouseDownStartPosition = action.payload;
            },

        }
    }
)

export const { zoomAction, moveWorldByMouseAction, setIsMovingAppViewAction, setMouseDownPosition } = ViewNavigationSlice.actions;
export default ViewNavigationSlice.reducer;

/*

Rect({x: 500, y: 500, w: 1000, h: 1000})
2000,2000
*0,1
2200,2200


šířka 1000


střed:
1000,1000=>1100,1100
500,500=550,550

initX += initSize*zoomBy*(initX/initSize)
################################


Rect({x: -500, y: -500, w: 1000, h: 1000})
*2

relativeX = w/x= -1/2

newW = 2000

newX = newW * relativeX = -1000;

################################

Rect({x: -400, y: -400, w: 1000, h: 1000})
*2

relativeX = w/x= -0,4

newW = 2000

newX = newW * relativeX = -800;


################################

Rect({x: -400, y: -400, w: 1000, h: 1000})
*1,2

relativeX = w/x= -0,4

newW = 1200

newX = newW * relativeX = -480;








*/