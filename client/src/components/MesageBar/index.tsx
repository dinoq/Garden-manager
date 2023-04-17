/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { DEPTH } from "../../helpers/constants";


interface IMessageBarProps {

}

const MessageBar: React.FC<IMessageBarProps> = (props) => {
    const dispatch = useAppDispatch();
    
    const worldZoom = useAppSelector(state => state.navigationReducer.zoom);
    const menuWidth = useAppSelector(state => state.guiReducer.menuWidth);

    return (
        <div css={css`
            position: fixed;
            background-color: #bababa29;
            z-index: ${DEPTH.MESSAGE_BAR};
            left: ${menuWidth+15}px;
            bottom: 10px;
            padding: 5px;
            max-width: 400px;
        `}>
            Start with.... dasdf asdf asdf adf asdf asdf adasdf asdf asdf adf asdf asdf adasdf asdf asdf adf asdf asdf adasdf asdf asdf adf asdf asdf adasdf asdf asdf adf asdf asdf asdf asdf 
        </div>
    )
}

export default MessageBar;