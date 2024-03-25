/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export interface ISelectboxProps {
    defaultValue: number,
    options: Array<any>,
}

export interface IOption {
    name: string,
    value: number
}

const Selectbox: React.FC<ISelectboxProps> = (props) => {
    return (
        <select css={css`                
    width: 100%;
    height: 30px;
    border-radius: 5px;
`}>
            {props.options.map((option: IOption) => {
                return <option value={option.value} selected={props.defaultValue === option.value}>{option.name}</option>
            })}
        </select>
    )
}



export default Selectbox;