/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { DEPTH } from '../../helpers/constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import Calendar from './components/Calendar';
import ManipulationTools from './components/ManipulationTools';
import EditingTools from './components/EditingTools';
import Button from '../../components/UI/Button';
import { toolBarMinimizedSelector, hideGUISelector } from '../../store/reducers/GUISlice/selectors';


const Header: React.FC<{}> = () => {
    const toolbarMinimized = useAppSelector(toolBarMinimizedSelector);
    const hideGUI = useAppSelector(hideGUISelector);

    return (
        <div css={css`
            width: 100%;
            height: 100%;
            background-color: #b3b3b3;
            display: flex;
            z-index: ${DEPTH.HEADER};
        `}>

            {!hideGUI && <EditingTools />}
            {!hideGUI && <ManipulationTools />}
            {!hideGUI && <Calendar />}
            <div css={css`
                /* margin-left: auto;*/
            `}><Button text={toolbarMinimized? "↓" : "↑"} onClick={()=>{}} /></div>

        </div>
    )
}




export default Header;