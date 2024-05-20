/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx } from "@emotion/react"

interface IButtonProps{
    text: string,
    onClick: React.MouseEventHandler
}
const Button: React.FC<IButtonProps> = (props) => {

    return (
        <div onClick={props.onClick} css={css`
            padding: 5px;
            border: 1px solid black;
            cursor: pointer;
        `}>
            {props.text}
        </div>
    )
}


export default Button;