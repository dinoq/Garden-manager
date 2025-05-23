/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export interface ILabelProps {
    text: string,
    children: JSX.Element[] | JSX.Element
}

const Label: React.FC<ILabelProps> = (props) => {
    
    return (
        <div css={css`
            width: 100%;
        `}>
            <h3>{props.text}</h3>
            {props.children}
        </div>
    )
}



export default Label;