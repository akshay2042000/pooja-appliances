import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { store, persistor } from './redux/configureStore';
import { Provider } from 'react-redux';
import ScrollToTop from './utils/ScrollToTop';
import LoadingComponent from './components/Skeletons/LoadingComponent';
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={LoadingComponent} persistor={persistor}>
            <BrowserRouter>
                <ScrollToTop />
                <App />
            </BrowserRouter>
        </PersistGate>

    </Provider>,
    document.getElementById('root')
);


serviceWorker.register();