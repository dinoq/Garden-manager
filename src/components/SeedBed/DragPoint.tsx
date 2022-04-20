/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { dragPointSize } from ".";
import { useAppSelector } from "../../hooks";

interface IDragPointProps {
    width: number,
    height: number,
    dragHandler: React.DragEventHandler<HTMLDivElement>,
    dragStartHandler: React.DragEventHandler<HTMLDivElement>,
}

const DragPoint: React.FC<IDragPointProps> = (props) => {
    const zoomAmount = useAppSelector(selector => selector.navigation.zoom);

    const dragCursorPos = { x: ((props.width * (zoomAmount / 100)) - dragPointSize) / 2, y: ((props.height * (zoomAmount / 100)) - dragPointSize) / 2 };

    return (

        <div draggable="true" onDrag={props.dragHandler} onDragStart={props.dragStartHandler}
            css={css`
        background: #3e3e3e;
        width: ${dragPointSize}px;
        height: ${dragPointSize}px;
        position: absolute;
        left: ${dragCursorPos.x}px;
        top: ${dragCursorPos.y}px;
        cursor: move;
    `}
        >
        </div>
    )
}

export default DragPoint;