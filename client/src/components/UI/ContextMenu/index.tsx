/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { IOption } from "../../types";
import ColumnContainer from "../ColumnContainer";
import { IPosition } from "../../../helpers/types";
import { DEPTH } from "../../../helpers/constants";
import React from "react";

type IContextMenuProps = {
    name: string,
    position: IPosition,
    items: IOption[],
    onItemClickHandler: (selectedItem: IOption) => void
}

const ContextMenu: React.ForwardRefRenderFunction<HTMLDivElement, IContextMenuProps> = ((props, ref) => {
    const onItemClickHandler = (e: React.MouseEvent) => {
        const clickedElement = (e.target as HTMLDivElement);
        const clickedItemID = clickedElement?.getAttribute("data-value") || undefined;
        if (clickedItemID !== undefined) {
            const clickedItem = props.items.find(item => item.value === parseInt(clickedItemID));
            if (clickedItem) {
                props.onItemClickHandler(clickedItem);
            }
        }
    }
    
    return (
        <div css={css`
            width: 250px;
            height: auto;
            background-color: gray;
            position: relative;
            left: ${props.position.x}px;
            top: ${props.position.y}px;
            z-index: ${DEPTH.CONTEXT_MENU};
        `} onClick={onItemClickHandler} ref={ref}>
            <ColumnContainer>
                {props.items.map((item: IOption) => {
                    return <div key={props.name + "-option-" + item.value} data-value={item.value}>{item.name}</div>
                })}
            </ColumnContainer>
        </div>
    )
})

export default React.memo(React.forwardRef<HTMLDivElement, IContextMenuProps>(ContextMenu));