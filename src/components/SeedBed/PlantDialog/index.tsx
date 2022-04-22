/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from "react";

export interface IPlantDialogProps {
    closePlantDialogHandler: React.MouseEventHandler<HTMLDivElement>
}

const PlantDialog: React.FC<IPlantDialogProps> = (props) => {


    return (
        <div css={css`
                width: 50%;
                height: 50%;
                padding: 15px;
                background-color: #ffffffea;
                border-radius: 20px;
                position: fixed;
                left: 25%;
                top: 25%;
            `}>
                asd

                <div onClick={props.closePlantDialogHandler} css={css`
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    border: 2px solid red;
                    padding: 5px;
                    color: red;
                    font-weight: bold;
                `}>
                    X
                </div>

        </div>
    )

}



export default PlantDialog;