/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from "react";

export interface IDetailIconProps {
    ObjectWidth: number,
    IconClicked: React.MouseEventHandler<HTMLDivElement>
}

const DetailIcon: React.FC<IDetailIconProps> = (props) => {


    return (
        <div onClick={props.IconClicked} css={css`
                width: 50px;
                height: 50px;
                padding: 0 4px;
                background-color: #ffffffce;
                border-radius: 7px;
                position: absolute;
                font-weight: bold;
                left: ${props.ObjectWidth - 15}px;
                
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



export default DetailIcon;