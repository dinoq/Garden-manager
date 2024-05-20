/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { DEPTH } from "../../../helpers/constants";


interface IMessageBarProps {

}

const MessageBar: React.FC<IMessageBarProps> = (props) => {
    const dispatch = useAppDispatch();
    const msg = useAppSelector(state => state.guiReducer.message);
    const worldZoom = useAppSelector(state => state.navigationReducer.zoom);
    const menuWidth = useAppSelector(state => state.guiReducer.menuWidth);

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