/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export interface ISelectboxProps {
    name: string,
    defaultValue: number,
    options: IOption[],
    onChange: React.ChangeEventHandler
}

export interface IOption {
    name: string,
    value: number
}

const Selectbox: React.FC<ISelectboxProps> = (props) => {

    
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {    
        props.onChange(e);
    }


    return (
        <select css={css`                
    width: 100%;
    height: 30px;
    border-radius: 5px;
`} onChange={onChange} value={props.defaultValue}>
            {props.options.map((option: IOption) => {
                return <option key={props.name + "-option-" + option.value} value={option.value}>{option.name}</option>
            })}
        </select>
    )
}



export default Selectbox;