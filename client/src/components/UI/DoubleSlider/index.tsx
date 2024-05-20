/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";
import Slider from "../Slider";

type IDoubleSliderProps = {
    defaultVals: {A: number, B: number};
    minVals: {A: number, B: number};
    maxVals: {A: number, B: number};
    onChange: {A: React.ChangeEventHandler, B: React.ChangeEventHandler}
}

const DoubleSlider: FC<IDoubleSliderProps> = (props) => {

    return (
        <div css={css`
            display: flex;
            width: 100%;
        `}>
                <Slider defaultVal={props.defaultVals.A} minVal={props.minVals.A} maxVal={props.maxVals.A} onChange={props.onChange.A} />
                <Slider defaultVal={props.defaultVals.B} minVal={props.minVals.B} maxVal={props.maxVals.B} onChange={props.onChange.B} />     
        </div>
    )
}

export default DoubleSlider;