/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { dragPointSize } from '.';
import { useAppSelector } from "../../hooks";

interface IResizePointsProps {
    width: number,
    height: number,
}

const ResizePoints: React.FC<IResizePointsProps> = (props) => {
    const zoomAmount = useAppSelector(selector => selector.navigation.zoom);

    const dragCursorPos = { x: ((props.width * (zoomAmount / 100)) - dragPointSize) / 2, y: ((props.height * (zoomAmount / 100)) - dragPointSize) / 2 };

    return (
        <React.Fragment>
            <ResizePoint left={-dragPointSize / 2} top={-dragPointSize / 2} />
            <ResizePoint left={props.width-dragPointSize / 2} top={-dragPointSize / 2} />
            <ResizePoint left={-dragPointSize / 2} top={props.height-dragPointSize / 2} />
            <ResizePoint left={props.width-dragPointSize / 2} top={props.height-dragPointSize / 2} />
        </React.Fragment>
    )
}

interface IResizePointProps {
    left: number,
    top: number
}
const ResizePoint: React.FC<IResizePointProps> = (props) => {


    return (
        <div draggable="true" /*onDrag={props.dragHandler} onDragStart={props.dragStartHandler}*/
            css={css`
        background: #262626;
        border: 1px solid black;
        width: ${dragPointSize}px;
        height: ${dragPointSize}px;
        position: absolute;
        left: ${props.left}px;
        top: ${props.top}px;
        cursor: resize;
    `}
        >
        </div>
    )
}
export default ResizePoints;