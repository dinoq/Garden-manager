/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';
import DragPoint from './DragPoint';
import ResizePoints from './ResizePoints';

export interface ISeedBedProps {
    id: number,
    width: number,
    height: number
}

export const dragPointSize = 10;

const SeedBed: React.FC<ISeedBedProps> = (props) => {
    const dispatch = useAppDispatch();

    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })
    const [view, setView] = useState({ x: 0, y: 0 });

    const zoomAmount = useAppSelector(selector => selector.navigation.zoom);


    const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
        setView((prevVal) => {
            return { x: e.clientX - clickStart.diffX, y: e.clientY - clickStart.diffY }
        })
    }

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(setIsMovingAppViewAction(false));
        setClickStart({ diffX: e.clientX - view.x, diffY: e.clientY - view.y })
    }

    return (
        <div onDragOver={e => e.preventDefault()} css={css`
                background: #686868;
                width: ${props.width * (zoomAmount / 100)}px;
                height: ${props.height * (zoomAmount / 100)}px;
                position: absolute;
                left: ${view.x * (zoomAmount / 100)}px;
                top: ${view.y * (zoomAmount / 100)}px;
            `}>
            <DragPoint width={props.width} height={props.height} dragHandler={dragHandler} dragStartHandler={dragStartHandler} />
            <ResizePoints width={props.width} height={props.height}/* dragHandler={dragHandler} dragStartHandler={dragStartHandler} *//>
        </div>
    )

}



export default SeedBed;