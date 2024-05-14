/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from "react";

export interface IRotateRowDirectionIconProps {
    seedBedWidth: number,
    IconClicked: React.MouseEventHandler<HTMLDivElement>
}

const RotateRowDirectionIcon: React.FC<IRotateRowDirectionIconProps> = (props) => {

    const bgSize = 24;
    return (
        <div onClick={props.IconClicked} css={css`
                width: ${bgSize}px;
                height: ${bgSize}px;                
                background-image: url("imgs/rotate-icon.png");
                background-size: contain;
                position: absolute;
                font-weight: bold;
                left: ${props.seedBedWidth - bgSize - 5}px;
                
                cursor: pointer;
            `}><div
                css={css`
            height: 15px;
            
            transform: translateY(-8px);
            `}>

                ...
            </div>

        </div>
    )

}



export default RotateRowDirectionIcon;