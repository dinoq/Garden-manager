/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
/*import { css, jsx } from "@emotion/react";

export interface IInputFieldProps {
    value: string,
    onKeyUpHandler: React.KeyboardEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    name: string,
    id: string,
    type: string
}

const InputField: React.FC<IInputFieldProps> = (props) => {
    return (
        <input value={props.value} onKeyUp={props.onKeyUpHandler} onChange={props.onChange} placeholder={props.placeholder} css={css`                
    width: 100%;
    height: 30px;
    border-radius: 5px;
`} type={props.type} name={} id="search-plant" />
    )
}



export default InputField;*/

export interface IInputFieldProps {
    value: string,
    onKeyUpHandler: React.KeyboardEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    name: string,
    id: string,
    type: string
}

const InputField: React.FC<any> = (props) => {
    return (
        <input css={css`                
    width: 100%;
    height: 30px;
    border-radius: 5px;
`} {...props}/>
    )
}



export default InputField;