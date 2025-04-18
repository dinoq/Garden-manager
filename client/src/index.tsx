import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { Provider } from 'react-redux';
import store from "./store/index"
import AppLayout from './components/layouts/AppLayout';

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
