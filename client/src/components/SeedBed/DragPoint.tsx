/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import { dragPointSize } from ".";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from "../../hooks/useAppSelector";
import { updatePositionAction, updateSelectedSeedBed } from '../../store/reducers/SeedBedsSlice';

interface IDragPointProps {
    id: number,
    dragHandler: Function,
    dragStartHandler: React.DragEventHandler<HTMLDivElement>,
    dragEndHandler: React.DragEventHandler<HTMLDivElement>,
    seedBedWidth: number,
    seedBedHeight: number,
    seedBedX: number,
    seedBedY: number
}

const DragPoint: React.FC<IDragPointProps> = (props) => {
    const dispatch = useAppDispatch();
    
    const dragCursorPos = { x: ((props.seedBedWidth) - dragPointSize) / 2, y: ((props.seedBedHeight) - dragPointSize) / 2 };

    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })
    const [initialSeedBedPos, setInitialSeedBedPos] = useState({ x: 0, y: 0 })
    const [isMoving, setIsMoving] = useState(false);
    
    const zoom = useAppSelector(selector => selector.navigationReducer.zoom);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        setIsMoving(true);
        setClickStart({ diffX: e.clientX - props.seedBedX, diffY: e.clientY - props.seedBedY })
        setInitialSeedBedPos({x: props.seedBedX, y: props.seedBedY})
        props.dragStartHandler(e);
    }
    
    const dragHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        const localSeedBedPosDiffX = (e.clientX - clickStart.diffX - initialSeedBedPos.x)/zoom;
        const localSeedBedPosDiffY = (e.clientY - clickStart.diffY - initialSeedBedPos.y)/zoom;
        props.dragHandler(e, localSeedBedPosDiffX, localSeedBedPosDiffY);
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) =>{
        setIsMoving(false);
        const diffX = (e.clientX - clickStart.diffX)/zoom;
        const diffY = (e.clientY - clickStart.diffY)/zoom;

        props.dragEndHandler(e);
        
        dispatch(updatePositionAction({ id: props.id, position: { x: diffX, y: diffY } }))
    }


    return (

        <div draggable="true" onDrag={dragHandler} onDragStart={dragStartHandler} onDragEnd={dragEndHandler} onMouseDown={()=>{dispatch(updateSelectedSeedBed(props.id))}}
            css={css`    
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