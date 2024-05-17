/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC, useState } from "react";

type ISliderProps = {
    defaultVal: number;
    minVal: number;
    maxVal: number;
    onChange: React.ChangeEventHandler
}

const Slider: FC<ISliderProps> = (props) => {
    const [min] = useState(props.minVal);
    const [max] = useState(props.maxVal);
    console.log('max: ', max);

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            padding: 5px 10px;
        `}>
            <input type="text" value={props.defaultVal} onChange={props.onChange} css={css`
                width: 100%;
            `} />
            <input type="range" value={props.defaultVal} min={min} max={max} onChange={props.onChange} css={css`
                width: 100%;
            `} />            
        </div>
    )
}

export default Slider;