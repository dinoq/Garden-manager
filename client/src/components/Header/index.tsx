/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { DEPTH } from '../../helpers/constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';
import Calendar from './Calendar';
import ManipulationTools from './ManipulationTools';
import EditingTools from './EditingTools';


const Header: React.FC<{}> = () => {

    const toolbarHeight = useAppSelector(state => state.guiReducer.toolbarHeight);
    const hideGUI = useAppSelector(state=> state.guiReducer.hideGUI);

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
            {hideGUI && <Calendar />}

        </div>
    )
}




export default Header;