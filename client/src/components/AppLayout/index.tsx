/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Header from "../Header";
import SideBar from "../SideBar";
import AppView from "../AppView";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

function AppLayout() {
    const dispatch = useAppDispatch();
    const menuWidth = useAppSelector(state => state.guiReducer.menuWidth);
    const toolbarHeight = useAppSelector(state => state.guiReducer.toolbarHeight);

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
        `}>
            <div css={css`
                height: ${toolbarHeight}px;
                width: 100vw;
                background-color: #00182e;
            `}>
                <Header />
            </div>
            <div css={css`
                height: calc(100vh - ${toolbarHeight}px);
                width: 100vw;
            `}>
                    <SideBar />
                    <AppView />

            </div>

        </div>
    );
}

export default AppLayout;
