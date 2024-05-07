/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import InputField from "../InputField";

export interface ISelectbox_deprecatedProps {
    defaultValue: number,
    options: Array<any>,
    onChange: Function
}

export interface IOption {
    name: string,
    value: number
}


const SearchableSelectbox_deprecated: React.FC<ISelectbox_deprecatedProps> = (props) => {
    const inputChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange(e);
    }
    return (
        <div>
            <select css={css`                
                width: 100%;
                height: 30px;
                border-radius: 5px;
            `} defaultValue={props.defaultValue} onChange={inputChanged}>
                {props.options.map((option: IOption) => {
                    return <option key={"plant-" + option.value} value={option.value}>{option.name}</option>
                })}
            </select>
            {/* <InputField value="" onChangeHandler={(e)=>{inputChanged(e)}} /> */}
        </div>
    )
}



export default SearchableSelectbox_deprecated;