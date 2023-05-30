/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export interface ISelectboxProps {
    defaultValue: string,
    options: Array<any>,
}

const Selectbox: React.FC<ISelectboxProps> = (props) => {
    return (
        <select css={css`                
    width: 100%;
    height: 30px;
    border-radius: 5px;
`} {...props}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
    )
}



export default Selectbox;