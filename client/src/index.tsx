import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import AppLayout from './components/AppLayout';
import { Provider } from 'react-redux';
import store from "./store/index"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppLayout />
        </Provider>
    </React.StrictMode>
);
