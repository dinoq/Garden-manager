/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { ReactText, useEffect, useState } from 'react';
import { DEPTH } from '../../../helpers/constants';

interface IFilterSwitchProps {
    options: Array<string>,
    optionType: "string" | "imgSrc",
    selectionChanged: Function
}

const IMG_OPTION_SIZE = 40;
const FilterSwitch: React.FC<IFilterSwitchProps> = (props) => {
    const [optionSelected, setOptionSelected] = useState(0);

    useEffect(() => {      
        if(props.options.length !== 2 && props.options.length !== 3){
            throw new Error("Unimplemented switch type: " + props.options.length + " options!");
        }
    }, [])

    useEffect(() => {      
        props.selectionChanged(optionSelected);
    }, [optionSelected])
    
    const getLeft = () => {
        let part = 100 / props.options.length;
        return part * optionSelected;
    }

    const getBgPosX = (index: number) => {
        const positions3Option = ["left", "center", "right"];
        const positions2Option = ["left", "right"];        
        return (props.options.length === 2)? positions2Option[index] : positions3Option[index];
    }

    
    const getBorderRadius = () => {
        const positions3Option = ["10px 0 0 10px", "0", "0 10px 10px 0"];
        const positions2Option = ["10px 0 0 10px", "0 10px 10px 0"];        
        return (props.options.length === 2)? positions2Option[optionSelected] : positions3Option[optionSelected];
    }

    return (
        <div css={css`
        background-color: lightgrey;
        border: 1px solid #161616;
            margin: 10px 5px;
            border-radius: 10px;
            overflow: hidden;
            `}>
            <div css={css`
                position: relative;
            `}>
                <div id="selector" css={css`
                        width: ${100 / props.options.length}%;
                        height: ${IMG_OPTION_SIZE}px;
                        background-color:#77ff76;
                        left: ${getLeft()}%;
                        border-radius: ${getBorderRadius()};
                        position: absolute;
                        z-index: ${DEPTH.SEARCH_FILTER_SWITCH_SELECTOR};
                        `}>
                </div>
            </div>
            <div css={css`
                display: flex;
                justify-content: space-between;
                    
                `}>
                {props.options.map((opt, index) => {
                    return (
                        <div id={"option" + index} key={"option" + index} onClick={setOptionSelected.bind(this, index)} css={css`
                                background-image: url("./imgs/${opt}");
                                background-repeat: no-repeat;
                                background-position-x: ${getBgPosX(index)};
                                width: ${100 / props.options.length}%;
                                height: ${IMG_OPTION_SIZE}px;
                                background-size: contain;
                                    z-index: ${DEPTH.SEARCH_FILTER_SWITCH_OPTION};
                                `}>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default FilterSwitch;