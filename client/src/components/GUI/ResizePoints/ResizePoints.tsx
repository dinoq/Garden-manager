/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import { dragPointSize } from '.';
import { zoomedFactory } from '../../../helpers/functions';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ROWDIRECTIONS } from './Plant';

interface IResizePointsProps {
    dragHandler: Function,
    dragStartHandler: Function,
    dragEndHandler: Function,
    objectWidth: number,
    objectHeight: number,
    minimalWidth: number,
    minimalHeight: number
}

const ResizePoints: React.FC<IResizePointsProps> = (props) => {
    const width = (props.objectWidth);
    const height = (props.objectHeight);

    return (
        <React.Fragment>
            {/* <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={-dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="nw-resize" />
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={width - dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="ne-resize" />
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={-dragPointSize / 2} top={height - dragPointSize / 2} resizeCursor="sw-resize" /> */}
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} left={width - dragPointSize / 2} top={height - dragPointSize / 2} resizeCursor="se-resize"  minimalWidth={props.minimalWidth} minimalHeight={props.minimalHeight} />
        </React.Fragment>
    )
}

interface IResizePointProps {
    left: number,
    top: number,
    resizeCursor: string,
    dragHandler: Function,
    dragStartHandler: Function,
    dragEndHandler: Function,
    minimalWidth: number,
    minimalHeight: number
}
const ResizePoint: React.FC<IResizePointProps> = (props) => {
    const dispatch = useAppDispatch();

    const zoom = useAppSelector(selector => selector.navigationReducer.zoom);
    const zoomed = zoomedFactory(zoom);

    const [isMoving, setIsMoving] = useState(false);


    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        setIsMoving(true);
        setClickStart({ diffX: e.clientX - props.left, diffY: e.clientY - props.top })
        props.dragStartHandler(e, e.clientX - props.left, e.clientY - props.top);
    }

    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })
    const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
        let newWidth = (e.clientX - clickStart.diffX) / zoom;
        newWidth = (newWidth >= props.minimalWidth) ? newWidth : props.minimalWidth;

        let newHeight = (e.clientY - clickStart.diffY) / zoom;
        newHeight = (newHeight >= props.minimalHeight) ? newHeight : props.minimalHeight;

        props.dragHandler(e, newWidth, newHeight);
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        setIsMoving(false);

        let newWidth = (e.clientX - clickStart.diffX) / zoom;
        newWidth = (newWidth >= props.minimalWidth) ? newWidth : props.minimalWidth;

        let newHeight = (e.clientY - clickStart.diffY) / zoom;
        newHeight = (newHeight >= props.minimalHeight) ? newHeight : props.minimalHeight;

        props.dragEndHandler(e, newWidth, newHeight);
    }

    return (
        <div draggable="true" onDrag={dragHandler} onDragStart={dragStartHandler} onDragEnd={dragEndHandler} css={css`
        background: #26262641;
        border: 1px solid #262626;
        width: ${dragPointSize}px;
        height: ${dragPointSize}px;
        position: absolute;
        left: ${props.left}px;
        top: ${props.top}px;
        cursor: ${props.resizeCursor};
        opacity: ${isMoving ? "0" : "1"};
    `}
        >
        </div>
    )
}
export default ResizePoints;