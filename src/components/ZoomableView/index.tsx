/** @jsxRuntime classic */
/** @jsx jsx */ 
import { css, jsx } from "@emotion/react";
import { DragEventHandler, useState } from "react";


interface IZoomableViewProps{
    
}

const ZoomableView : React.FC<IZoomableViewProps> = (props) =>{
    const [clickStart, setClickStart] = useState({x: 0, y: 0})
    const [view, setView] = useState({x: 0, y: 0});

    const d = (e: React.DragEvent<HTMLDivElement>)=>{
        console.log('e.clientX,e.pageX, e.screenX, e.movementX: ', e);
        setView({x: e.clientX-clickStart.x, y: e.clientY-clickStart.y});
    }

    return (
        <div>
            <div draggable={true} onDrag={d} onDragStart={(e: React.DragEvent<HTMLDivElement>)=>{console.log("S",e.clientX, e.clientY);setClickStart({x: e.clientX, y: e.clientY})}} onDragOver={(event)=>{event.preventDefault();}} css={css`
                background: blue;
                width: 50px;
                height: 40px;
                position:absolute;
                left: ${view.x}px;
                top: ${view.y}px;
            `}>asd</div>
        </div>
    )
}

export default ZoomableView;