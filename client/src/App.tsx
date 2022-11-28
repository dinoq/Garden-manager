/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import AppView from "./components/AppView";
import { useAppDispatch } from './hooks/useAppSelector';
import { useEffect } from 'react';
import { setIsMovingAppViewAction } from './store/reducers/ViewNavigationSlice';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dispatch(setIsMovingAppViewAction(false));
            }
        }

        const preventMiddleButtonEventHandler = (e: MouseEvent) => {
            if(e.button == 1){
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
        <div className="App" css={css`
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
        `}>
            <Header />
            <div css={css`               
                flex-grow: 1;
                display: flex;
                flex-direction: row;
            `}>
                <SideBar />
                <AppView />
            </div>
        </div>
    );
}

export default App;
