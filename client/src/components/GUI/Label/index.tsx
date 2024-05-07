/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export interface ILabelProps {
    text: string,
    children: JSX.Element[] | JSX.Element
}

const Label: React.FC<ILabelProps> = (props) => {
    
    return (
        <div>
            {props.text}
            {props.children}
        </div>
    )
}



export default Label;