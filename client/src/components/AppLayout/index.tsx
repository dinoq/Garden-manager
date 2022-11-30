/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Header from "../Header";
import SideBar from "../SideBar";
import AppView from "../AppView";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';

function AppLayout() {
    const dispatch = useAppDispatch();

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

    /**
     * 
     
            <div className="App" css={css`
                display: flex;
                flex-direction: column;
                height: 100vh;
                width: 100vw;
                overflow: hidden;
            `}>
                <Header />
                <div css={css`               
                    flex-grow: 1;
                    display: flex;
                    flex-direction: row;
                    overflow: hidden;
                `}>
                    <SideBar />
                    <AppView />
                </div>
            </div>
     */
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        `}>
            <div css={css`
                height: 20vh;
                width: 100vw;
                background-color: #00182e;
            `}>
                <Header />
            </div>
            <div css={css`
                display: flex;
                flex-direction: row;
                height: 80vh;
                width: 100vw;
            `}>
                <div css={css`
                    height: 100%;
                    width: 20vw;
                    background-color: #002b0e;
                `}>
                    <SideBar />
                    
                </div>
                <div css={css`
                    height: 100%;
                    width: 80vw;
                    background-color: #0a0030;
                `}>
                    RS
                </div>

            </div>

        </div>
    );
}

export default AppLayout;
