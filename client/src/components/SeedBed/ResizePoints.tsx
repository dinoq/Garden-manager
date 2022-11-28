/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import { dragPointSize } from '.';
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { updateHeightAction, updateWidthAction } from '../../store/reducers/SeedBedsSlice';

interface IResizePointsProps {
    id: number,
    dragHandler: Function,
    dragStartHandler: Function,
    dragEndHandler: Function,
    seedBedWidth: number,
    seedBedHeight: number,

    
}

const ResizePoints: React.FC<IResizePointsProps> = (props) => {
    const zoom = useAppSelector(selector => selector.navigation.zoom);

    const width = (props.seedBedWidth);
    const height = (props.seedBedHeight);

    return (
        <React.Fragment>
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler}  id={props.id} left={-dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="nw-resize" />
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={width-dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="ne-resize" />
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={-dragPointSize / 2} top={height-dragPointSize / 2} resizeCursor="sw-resize" />
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={width-dragPointSize / 2} top={height-dragPointSize / 2} resizeCursor="se-resize" />
        </React.Fragment>
    )
}

interface IResizePointProps {
    id: number,
    left: number,
    top: number,
    resizeCursor: string,
    dragHandler: Function,
    dragStartHandler: Function,
    dragEndHandler: Function,
}
const ResizePoint: React.FC<IResizePointProps> = (props) => {
    const dispatch = useAppDispatch();

    const seedBed = useAppSelector(state => state.seedBeds[props.id]);

    const [isMoving, setIsMoving] = useState(false);

    const zoom = useAppSelector(selector => selector.navigation.zoom);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        setIsMoving(true);
        setClickStart({ diffX: e.clientX - props.left, diffY: e.clientY - props.top })
        props.dragStartHandler(e, e.clientX - props.left, e.clientY - props.top);
    }
    
    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })
    const dragHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        let newWidth = (e.clientX - clickStart.diffX)/zoom;
        newWidth = (newWidth > 5)? newWidth : seedBed.width;

        let newHeight = (e.clientY - clickStart.diffY)/zoom;
        newHeight = (newHeight > 5)? newHeight : seedBed.height;

        props.dragHandler(e, newWidth, newHeight);
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        setIsMoving(false);
        
        let newWidth = (e.clientX - clickStart.diffX)/zoom;
        newWidth = (newWidth > 20)? newWidth : seedBed.width;

        let newHeight = (e.clientY - clickStart.diffY)/zoom;
        newHeight = (newHeight > 20)? newHeight : seedBed.height;
    
        props.dragEndHandler(e, newWidth, newHeight);
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