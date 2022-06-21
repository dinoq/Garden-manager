/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import { dragPointSize } from '.';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateHeightAction, updateWidthAction } from '../../store/reducers/SeedBedsSlice';

interface IResizePointsProps {
    id: number,
}

const ResizePoints: React.FC<IResizePointsProps> = (props) => {
    const zoomAmount = useAppSelector(selector => selector.navigation.zoom);

    const seedBed = useAppSelector(state => state.seedBeds[props.id]);

    // const dragCursorPos = { x: ((props.dimensions.width * (zoomAmount / 100)) - dragPointSize) / 2, y: ((props.dimensions.height * (zoomAmount / 100)) - dragPointSize) / 2 };

    const width = (seedBed.width * (zoomAmount / 100));
    const height = (seedBed.height * (zoomAmount / 100));

    return (
        <React.Fragment>
            <ResizePoint id={props.id} left={-dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="nw-resize" />
            <ResizePoint id={props.id} left={width-dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="ne-resize" />
            <ResizePoint id={props.id} left={-dragPointSize / 2} top={height-dragPointSize / 2} resizeCursor="sw-resize" />
            <ResizePoint id={props.id} left={width-dragPointSize / 2} top={height-dragPointSize / 2} resizeCursor="se-resize" />
        </React.Fragment>
    )
}

interface IResizePointProps {
    id: number,
    left: number,
    top: number,
    resizeCursor: string,
}
const ResizePoint: React.FC<IResizePointProps> = (props) => {
    const dispatch = useAppDispatch();

    const seedBed = useAppSelector(state => state.seedBeds[props.id]);

    const [isMoving, setIsMoving] = useState(false);

    //const worldPosition = useAppSelector(state => state.navigation.position);
    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })
    const dragHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        let newWidth = e.clientX - clickStart.diffX;
        newWidth = (newWidth > 20)? newWidth : seedBed.width;

        let newHeight = e.clientY - clickStart.diffY;
        newHeight = (newHeight > 20)? newHeight : seedBed.height;

        dispatch(updateWidthAction({id: props.id, newWidth}));
        dispatch(updateHeightAction({id: props.id, newHeight}));
    }
    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        setIsMoving(true);
        setClickStart({ diffX: e.clientX - props.left, diffY: e.clientY - props.top })
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        setIsMoving(false);
    }

    return (
        <div draggable="true" onDrag={dragHandler} onDragStart={dragStartHandler} onDragEnd={dragEndHandler}
            css={css`
        background: #26262641;
        border: 1px solid #262626;
        width: ${dragPointSize}px;
        height: ${dragPointSize}px;
        position: absolute;
        left: ${props.left}px;
        top: ${props.top}px;
        cursor: ${props.resizeCursor};
        opacity: ${isMoving? "0": "1"};
    `}
        >
        </div>
    )
}
export default ResizePoints;