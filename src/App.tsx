/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import AppView from "./components/AppView";

function App() {

    return (
        <div className="App" css={css`
            display: flex;
            flex-direction: column;
            height: 100%;
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
