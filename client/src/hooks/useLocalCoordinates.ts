import React, { useState } from "react";
import { IPosition } from "../helpers/types";
import { RootState } from "../store";
import { moveWorldByMouseAction } from "../store/reducers/ViewNavigationSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

const useLocalCoordinates = (/*coord: IPosition,*/ reduxLocation: (state: RootState)=>IPosition): {pos: IPosition, updateLocal: any, updateGlobal: any} => {
    const dispatch = useAppDispatch();
    const [localPosDiff, setLocalPosDiff] = useState<IPosition>({x: 0, y: 0});
    const reduxPosition: IPosition = useAppSelector(state => reduxLocation(state))
    
    const posX = reduxPosition.x + localPosDiff.x;
    const posY = reduxPosition.y + localPosDiff.y;
    const pos: IPosition = {
        x: posX,
        y: posY
    }
    console.log('pos: ', pos);
    
    const updateLocal = (e: React.MouseEvent<HTMLDivElement>, mouseStartDiffPosition: any)=>{
        let newLocalPosDiffX = (e.clientX - reduxPosition.x) - mouseStartDiffPosition.diffX;
        let newLocalPosDiffY = (e.clientY - reduxPosition.y) - mouseStartDiffPosition.diffY;

        //Check boundaries
        console.warn("Check boundaries!");
        if (pos.x > 0 && newLocalPosDiffX > 0)
            newLocalPosDiffX = localPosDiff.x;
        if (pos.y > 0 && newLocalPosDiffY > 0)
            newLocalPosDiffY = localPosDiff.y;

        /*if (browserWidth - worldWidth > pos.x)
            newLocalPosDiffX = localPosDiff.x;
        if (browserHeight - worldHeight > pos.y)
            newLocalPosDiffY = localPosDiff.y;*/


        setLocalPosDiff({ x: newLocalPosDiffX, y: newLocalPosDiffY })

    }

    const updateGlobal = (e: React.MouseEvent<HTMLDivElement>, mouseStartDiffPosition: any) =>{

        let newX = e.clientX - mouseStartDiffPosition.diffX;
        let newY = e.clientY - mouseStartDiffPosition.diffY;
        if (newX > 0)
            newX = 0;
        if (newY > 0)
            newY = 0;

        console.warn("Check boundaries 2!");
/*
        if (browserWidth - worldWidth > newX)
            newX = browserWidth - worldWidth;

        if (browserHeight - worldHeight > newY)
            newY = browserHeight - worldHeight;*/
        dispatch(moveWorldByMouseAction({ x: newX, y: newY }));
        setLocalPosDiff({ x: 0, y: 0 })
    }
    
    return {
        pos,
        updateLocal,
        updateGlobal
    };
}

export default useLocalCoordinates;