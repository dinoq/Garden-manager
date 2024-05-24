/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { DEPTH } from "../../../../helpers/constants";
import { messageSelector, menuWidthSelector } from "../../../../store/reducers/GUISlice/selectors";
import { zoomSelector } from "../../../../store/reducers/ViewNavigationSlice/selectors";


interface IMessageBarProps {

}

const MessageBar: React.FC<IMessageBarProps> = (props) => {
    const dispatch = useAppDispatch();
    const msg = useAppSelector(messageSelector);
    const worldZoom = useAppSelector(zoomSelector);
    const menuWidth = useAppSelector(menuWidthSelector);

    return (
        <div css={css`
            position: fixed;
            background-color: #1b442c29;
            color: #dddddd;
            z-index: ${DEPTH.MESSAGE_BAR};
            left: ${menuWidth+15}px;
            bottom: 10px;
            padding: ${msg.length > 0? 5 : 0}px;
            max-width: 400px;
        `}>
            {msg}
        </div>
    )
}

export default MessageBar;