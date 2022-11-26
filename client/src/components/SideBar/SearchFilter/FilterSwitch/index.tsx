/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import { DEPTH } from '../../../../helpers/constants';

interface IFilterSwitchProps {
    options: Array<string>,
    optionType: "string" | "imgSrc"
}

const IMG_OPTION_SIZE = 40;
const FilterSwitch: React.FC<IFilterSwitchProps> = (props) => {
    const [optionSelected, setOptionSelected] = useState(0);


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
                        width: 30%;
                        height: ${IMG_OPTION_SIZE}px;
                        background-color:#77ff76;;
                        border-radius: 10px;
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
                            <div id={"option" + index} css={css`
                                background-image: url("./imgs/${opt}");
                                width: ${IMG_OPTION_SIZE}px;
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