/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import { dragPointSize } from ".";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IPosition } from '../../../helpers/types';

interface IDragPointProps {
    id: number,
    dragHandler: Function,
    dragStartHandler: React.DragEventHandler<HTMLDivElement>,
    dragEndHandler: (e: React.DragEvent<HTMLDivElement>, position: IPosition) => void,
    objectWidth: number,
    objectHeight: number,
    objectX: number,
    objectY: number
}

const DragPoint: React.FC<IDragPointProps> = (props) => {    
    const dragCursorPos = { x: ((props.objectWidth) - dragPointSize) / 2, y: ((props.objectHeight) - dragPointSize) / 2 };

    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })
    const [initialObjectPos, setInitialObjectPos] = useState({ x: 0, y: 0 })
    const [isMoving, setIsMoving] = useState(false);
    
    const zoom = useAppSelector(selector => selector.navigationReducer.zoom);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        setIsMoving(true);
        setClickStart({ diffX: e.clientX - props.objectX, diffY: e.clientY - props.objectY })
        setInitialObjectPos({x: props.objectX, y: props.objectY})
        props.dragStartHandler(e);
    }
    
    const dragHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        const localObjectPosDiffX = (e.clientX - clickStart.diffX - initialObjectPos.x)/zoom;
        const localObjectPosDiffY = (e.clientY - clickStart.diffY - initialObjectPos.y)/zoom;
        props.dragHandler(e, localObjectPosDiffX, localObjectPosDiffY);
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        setIsMoving(false);
        const diffX = (e.clientX - clickStart.diffX)/zoom;
        const diffY = (e.clientY - clickStart.diffY)/zoom;

        const position = { x: diffX, y: diffY }
        props.dragEndHandler(e, position);        
    }


    return (

        <div draggable="true" onDrag={dragHandler} onDragStart={dragStartHandler} onDragEnd={dragEndHandler} css={css`    
        background: #3e3e3e54;
        border: 1px solid #303030;
        width: ${dragPointSize}px;
        height: ${dragPointSize}px;
        position: absolute;
        left: ${dragCursorPos.x}px;
        top: ${dragCursorPos.y}px;
        cursor: move;
        opacity: ${isMoving? "0": "1"};
    `}
        >
        </div>
    )
}

export default DragPoint;