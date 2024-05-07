/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import { dragPointSize } from '.';
import { zoomedFactory } from '../../helpers/functions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from "../../hooks/useAppSelector";
import { updateHeightAction, updateSelectedSeedBed, updateWidthAction } from '../../store/reducers/SeedBedsSlice';
import { ROWDIRECTIONS } from './Plant';

interface IResizePointsProps {
    id: number,
    dragHandler: Function,
    dragStartHandler: Function,
    dragEndHandler: Function,
    seedBedWidth: number,
    seedBedHeight: number,


}

const ResizePoints: React.FC<IResizePointsProps> = (props) => {
    const width = (props.seedBedWidth);
    const height = (props.seedBedHeight);

    return (
        <React.Fragment>
            {/* <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={-dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="nw-resize" />
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={width - dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="ne-resize" />
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={-dragPointSize / 2} top={height - dragPointSize / 2} resizeCursor="sw-resize" /> */}
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={width - dragPointSize / 2} top={height - dragPointSize / 2} resizeCursor="se-resize" />
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

    const zoom = useAppSelector(selector => selector.navigationReducer.zoom);
    const zoomed = zoomedFactory(zoom);

    const seedBed = useAppSelector(state => state.seedBedsReducer.seedBeds[props.id]);
    const seedBedDirection = seedBed.rowsDirection;
    const minimalWidth = (seedBedDirection == ROWDIRECTIONS.LEFT_TO_RIGHT) ? seedBed.plant.PlantSpacingMin : seedBed.plant.RowSpacingMin;
    const minimalHeight = (seedBedDirection == ROWDIRECTIONS.LEFT_TO_RIGHT) ? seedBed.plant.RowSpacingMin : seedBed.plant.PlantSpacingMin;

    const [isMoving, setIsMoving] = useState(false);


    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        setIsMoving(true);
        setClickStart({ diffX: e.clientX - props.left, diffY: e.clientY - props.top })
        props.dragStartHandler(e, e.clientX - props.left, e.clientY - props.top);
    }

    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })
    const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
        let newWidth = (e.clientX - clickStart.diffX) / zoom;
        newWidth = (newWidth >= 0) ? newWidth : seedBed.width;

        let newHeight = (e.clientY - clickStart.diffY) / zoom;
        newHeight = (newHeight >= 0) ? newHeight : seedBed.height;

        props.dragHandler(e, newWidth, newHeight);
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        setIsMoving(false);

        let newWidth = (e.clientX - clickStart.diffX) / zoom;
        newWidth = (newWidth >= minimalWidth) ? newWidth : minimalWidth;

        let newHeight = (e.clientY - clickStart.diffY) / zoom;
        newHeight = (newHeight >= minimalHeight) ? newHeight : minimalHeight;

        props.dragEndHandler(e, newWidth, newHeight);
    }

    return (
        <div draggable="true" onDrag={dragHandler} onDragStart={dragStartHandler} onDragEnd={dragEndHandler} onMouseDown={() => { dispatch(updateSelectedSeedBed(props.id)) }}
            css={css`
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