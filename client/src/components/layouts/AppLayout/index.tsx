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
import { tabBarHeightSelector, selectedTabSelector } from '../../../store/reducers/GUISlice/selectors';
import DBManager from '../../../helpers/DBManager';
import { settingsActions } from '../../../store/reducers/SettingsSlice';
import useClickOutside from '../../../hooks/useClickOutside';

function AppLayout() {
    const dispatch = useAppDispatch();
    const tabBarHeight = useAppSelector(tabBarHeightSelector);
    const selectedTab = useAppSelector(selectedTabSelector);
    const appLayoutRef = useClickOutside((e: MouseEvent) => {
        /*if (e.button === 1) { // Todo originally was probably needed - but not now?
            e.preventDefault();
        }*/
    });

    useEffect(()=>{
        const settings = DBManager.getSettings();
        if(settings){
            dispatch(settingsActions.hydrate(settings));
        }
    }, [dispatch])
    
    const tabs = [<DesignPage />, <NotesView />, <SettingsView />];
    
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            background-color: #a3a3a3;
        `} ref={appLayoutRef}>
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
