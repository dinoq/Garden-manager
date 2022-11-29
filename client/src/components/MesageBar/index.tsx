/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";


interface IMessageBarProps {

}

const MessageBar: React.FC<IMessageBarProps> = (props) => {
    const dispatch = useAppDispatch();
    
    const worldZoom = useAppSelector(state => state.navigation.zoom);

    return (
        <div css={css`
            position: fixed;
            background-color: #bababa;
            z-index: 100000;
            left: 250px;
            bottom: 10px;
            padding: 5px;
            max-width: 450px;
        `}>
            Start with.... dasdf asdf asdf adf asdf asdf adasdf asdf asdf adf asdf asdf adasdf asdf asdf adf asdf asdf adasdf asdf asdf adf asdf asdf adasdf asdf asdf adf asdf asdf asdf asdf 
        </div>
    )
}

export default MessageBar;