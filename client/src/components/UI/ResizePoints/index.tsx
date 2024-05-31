/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { cmToPX, pxToCM, zoomedFactory } from '../../../helpers/functions';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from "../../../hooks/useAppSelector";
import { zoomSelector } from '../../../store/reducers/ViewNavigationSlice/selectors';

interface IResizePointsProps {
    dragHandler: Function,
    dragStartHandler: Function,
    dragEndHandler: Function,
    objectWidth: number,
    objectHeight: number,
    minimalWidth: number,
    minimalHeight: number
}

export const resizePointSize = 12;

const ResizePoints: React.FC<IResizePointsProps> = (props) => {
    const width = (props.objectWidth);
    console.log('width: ', width);
    const height = (props.objectHeight);

    return (
        <React.Fragment>
            {/* <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={-dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="nw-resize" />
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={width - dragPointSize / 2} top={-dragPointSize / 2} resizeCursor="ne-resize" />
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} id={props.id} left={-dragPointSize / 2} top={height - dragPointSize / 2} resizeCursor="sw-resize" /> */}
            <ResizePoint dragStartHandler={props.dragStartHandler} dragHandler={props.dragHandler} dragEndHandler={props.dragEndHandler} left={width - resizePointSize / 2} top={height - resizePointSize / 2} resizeCursor="se-resize" minimalWidth={props.minimalWidth} minimalHeight={props.minimalHeight} />
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

    const zoom = useAppSelector(zoomSelector);
    const zoomed = zoomedFactory(zoom);

    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })
    const [isMoving, setIsMoving] = useState(false);


    const dragHandler = (e: MouseEvent) => {
        if (isMoving) {
            let newWidth = computeNewDimension(clickStart.diffX, props.minimalWidth, e.clientX);

            let newHeight = computeNewDimension(clickStart.diffY, props.minimalHeight, e.clientY);

            props.dragHandler(e, pxToCM(newWidth, zoom), pxToCM(newHeight, zoom));
        }
    }

    const computeNewDimension = (click: number, minimalVal: number, eventVal: number): number => {
        let newVal = (eventVal - click + resizePointSize / 2) / zoom;
        newVal = (newVal >= minimalVal) ? newVal : minimalVal;
        return newVal;
    }

    const dragHandlerStart = (e: React.MouseEvent) => {
        setIsMoving(true);
        setClickStart({ diffX: e.clientX - props.left, diffY: e.clientY - props.top })
        props.dragStartHandler(e, e.clientX - props.left, e.clientY - props.top);

        let newWidth = computeNewDimension(e.clientX - props.left, props.minimalWidth, e.clientX);
        let newHeight = computeNewDimension(e.clientY - props.top, props.minimalHeight, e.clientY);

        props.dragHandler(e, pxToCM(newWidth, zoom), pxToCM(newHeight, zoom));
    };


    const dragEndHandler = (e: MouseEvent) => {
        if (isMoving) {
            setIsMoving(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', dragHandler);
        document.addEventListener('mouseup', dragEndHandler);

        return () => {
            document.removeEventListener('mousemove', dragHandler);
            document.removeEventListener('mouseup', dragEndHandler);
        };
    }, [isMoving]);

    return (
        <div onMouseDown={dragHandlerStart} css={css`
        background: #26262641;
        border: 1px solid #262626;
        width: ${resizePointSize}px;
        height: ${resizePointSize}px;
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