/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import React, { useState } from 'react';

interface IMovePointProps {
    setPosition: Function
}
const MovePoint: React.FC<IMovePointProps> = (props) => {
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [isMouseDown, setIsMouseDown] = useState(false);

    const dragStart = (e: React.MouseEvent<HTMLImageElement>) => {
        setStartPos({
            x: e.clientX,
            y: e.clientY
        })
        console.log('startPos: ', startPos);
        setIsMouseDown(true);
    }
    const drag = (e: React.MouseEvent<HTMLImageElement>) => {
        if (isMouseDown) {
            props.setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y,
            })
        }
    }
    const dragEnd = (e: React.MouseEvent<HTMLImageElement>) => {
        console.log('startPos: ', startPos);
        setIsMouseDown(false);
    }
    return (
        <div>
            <img src="./imgs/move.png" css={css`            
            width: 30px;
            left: 71px;
            bottom: -14px;
            position: absolute;
            cursor: move;
        `} onMouseDown={dragStart} onMouseMove={drag} onMouseUp={dragEnd} />

        </div>
    )
}

export default MovePoint;