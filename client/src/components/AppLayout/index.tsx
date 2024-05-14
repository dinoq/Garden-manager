/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import AppView from "../AppView";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import TabBar from '../GUI/TabBar';
import NotesView from '../NotesView';
import SettingsView from '../SettingsView';

function AppLayout() {
    const dispatch = useAppDispatch();
    const menuWidth = useAppSelector(state => state.guiReducer.menuWidth);
    const toolbarHeight = useAppSelector(state => state.guiReducer.toolbarHeight);
    const hideGUI = useAppSelector(state=> state.guiReducer.hideGUI);

    const selectedTab = useAppSelector(state => state.guiReducer.selectedTab);
    const tabs = [<AppView />, <NotesView />, <SettingsView />];
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dispatch(setIsMovingAppViewAction(false));
            }
        }

        const preventMiddleButtonEventHandler = (e: MouseEvent) => {
            if (e.button == 1) {
                e.preventDefault();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', preventMiddleButtonEventHandler);

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            background-color: #a3a3a3;
        `}>
            <div css={css`
                height: ${toolbarHeight}px;
                width: 100vw;
            `}>
                <TabBar />
            </div>
            <div css={css`
            `}>
                {tabs[selectedTab]}
            </div>
        </div>
    );
}

export default AppLayout;
