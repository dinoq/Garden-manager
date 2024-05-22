/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { selectedTabSelector } from "../../../layouts/AppLayout/selectors";

type ITabProps = {
    name: string,
    id: number,
    tabClicked: React.MouseEventHandler
}

const Tab: FC<ITabProps> = (props) => {
    const selectedTab = useAppSelector(selectedTabSelector);
    
    const selectedColor = "#c2c2c2";

    return (
        <div css={css`
            padding: 5px 10px;
            cursor: pointer;
                background-color: ${(selectedTab == props.id)? selectedColor : "initial"};

            :hover{
                background-color: ${selectedColor};
            }
        `} onClick={props.tabClicked} id={"tab-" + props.id}>
            {props.name}
        </div>
    )
}

export default Tab;