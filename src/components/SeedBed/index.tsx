/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from "react";
import { IPlant } from '../../helpers/plant-types';
import { ISeedBed } from '../../helpers/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updatePositionAction } from '../../store/reducers/SeedBedsSlice';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';
import DragPoint from './DragPoint';
import ResizePoints from './ResizePoints';

export interface ISeedBedProps extends ISeedBed {
}

export const dragPointSize = 8;

const SeedBed: React.FC<ISeedBedProps> = (props) => {
    const dispatch = useAppDispatch();

    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })

    const zoomAmount = useAppSelector(selector => selector.navigation.zoom);


    const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(updatePositionAction({id: props.id, position: { x: e.clientX - clickStart.diffX, y: e.clientY - clickStart.diffY }}))
    }

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(setIsMovingAppViewAction(false));
        setClickStart({ diffX: e.clientX - props.x, diffY: e.clientY - props.y })
    }

    return (
        <div css={css`
                /*background: #686868;*/
                background: url("${props.plant.icon}");
                width: ${props.width * (zoomAmount / 100)}px;
                height: ${props.height * (zoomAmount / 100)}px;
                position: absolute;
                left: ${props.x * (zoomAmount / 100)}px;
                top: ${props.y * (zoomAmount / 100)}px;
                z-index: 2000;
            `}>
            <DragPoint id={props.id} dragHandler={dragHandler} dragStartHandler={dragStartHandler} />
            <ResizePoints id={props.id} /* dragHandler={dragHandler} dragStartHandler={dragStartHandler} *//>
        </div>
    )

}



export default SeedBed;