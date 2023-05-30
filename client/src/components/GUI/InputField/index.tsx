/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export interface IInputFieldProps {
    value: string,
    onKeyUpHandler?: React.KeyboardEventHandler<HTMLInputElement>,
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    name?: string,
    id?: string,
    type?: string
}

const InputField: React.FC<IInputFieldProps> = (props) => {
    const {onKeyUpHandler, onChangeHandler, ...inputProps} = props;
    return (
        <input css={css`                
    width: 100%;
    height: 30px;
    border-radius: 5px;
`} onKeyUp={onKeyUpHandler} onChange={onChangeHandler} {...inputProps}/>
    )
}



export default InputField;