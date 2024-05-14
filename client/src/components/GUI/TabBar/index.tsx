/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";
import Tab from "./Tab";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { changeTabAction } from "../../../store/reducers/GUISlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

type ITabBarProps = {
}

const TabBar: FC<ITabBarProps> = () => {
    const dispatch = useAppDispatch();
    const selectedTab = useAppSelector(state => state.guiReducer.selectedTab);

    const tabs = ["Design", "notes", "settings"]
    //const tabs = ["Design", "plants/parts list", "notes", "planning calendar", "settings","Crop and varieties manager", "control garden (IoT)", "shop"]

    const tabClickedEventHandler = (e: React.MouseEvent) => {
        const tabID = parseInt(e.currentTarget.id.substring(e.currentTarget.id.indexOf("-") + 1));
        dispatch(changeTabAction(tabID));
    }
    
    return (
        <div css={css`
            display: flex;
            height: 50px;
            background-color: #e0e0e0;
            width: 100%;
        `}>
            {
                tabs.map((tab, index) => {
                    return <Tab key={"tab-" + index} id={index} name={tab} tabClicked={tabClickedEventHandler}/>
                })
            }
        </div>
    )
}

export default TabBar;