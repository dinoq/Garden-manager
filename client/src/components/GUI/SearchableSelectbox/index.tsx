/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import InputField from "../InputField";

export interface ISelectboxProps {
    defaultValue: number,
    options: Array<any>,
}

export interface IOption {
    name: string,
    value: number
}

const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value
    console.log('e.target.value: ', e.target.value);
}

const SearchableSelectbox: React.FC<ISelectboxProps> = (props) => {
    return (
        <div>
            <select css={css`                
    width: 100%;
    height: 30px;
    border-radius: 5px;
`}>
                {props.options.map((option: IOption) => {
                    return <option value={option.value} selected={props.defaultValue === option.value}>{option.name}</option>
                })}
            </select>
            <InputField value="" onChangeHandler={inputChanged} />
        </div>
    )
}



export default SearchableSelectbox;