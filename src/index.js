import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/index.css";
import "./style/reset.css";
import App from './components/app/App';

import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    // </React.StrictMode>
);
