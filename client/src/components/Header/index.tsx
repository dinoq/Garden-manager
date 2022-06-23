/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';
import Calendar from './Calendar';
import ManipulationTools from './ManipulationTools';


const Header: React.FC<{}> = () => {

    const toolbarHeight = useAppSelector(state => state.gui.toolbarHeight);
    return (
        <div css={css`
            width: 100%;
            height: ${toolbarHeight}px;
            background-color: #a6a6a6;
            display: flex;
        `}>

            <ManipulationTools />
            <Calendar />

        </div>
    )
}




export default Header;