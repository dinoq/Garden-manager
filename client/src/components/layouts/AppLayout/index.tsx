/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect } from 'react';
import NotesView from '../../../pages/NotesPage';
import SettingsView from '../../../pages/SettingsPage';
import { useAppSelector } from '../../../hooks/useAppSelector';
import DesignPage from '../../../pages/DesignPage';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import TabBar from '../../UI/TabBar';

function AppLayout() {
    const dispatch = useAppDispatch();
    const tabBarHeight = useAppSelector(state => state.guiReducer.tabBarHeight);

    const selectedTab = useAppSelector(state => state.guiReducer.selectedTab);
    const tabs = [<DesignPage />, <NotesView />, <SettingsView />];
    
    useEffect(() => {
        const preventMiddleButtonEventHandler = (e: MouseEvent) => {
            if (e.button === 1) {
                e.preventDefault();
            }
        }

        document.addEventListener('mousedown', preventMiddleButtonEventHandler);

        return function cleanup() {
            document.removeEventListener('mousedown', preventMiddleButtonEventHandler);
        }
    }, [dispatch]);

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
                width: 100vw;
                height: ${tabBarHeight}px;
            `}>
                <TabBar />
            </div>
            <div css={css`
                height: calc(100% - ${tabBarHeight}px);
            `}>
                {tabs[selectedTab]}
            </div>
        </div>
    );
}

export default AppLayout;
