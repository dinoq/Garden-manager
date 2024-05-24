/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";
import { flexColumn } from "../../../styles/mixins";

type IColumnContainerProps = {
    children: JSX.Element[] | JSX.Element
}

const ColumnContainer: FC<IColumnContainerProps> = (props) => {
    
    return (
        <div css={css`
            ${flexColumn}
        `}>
            {props.children}
        </div>
    )
}

export default ColumnContainer;