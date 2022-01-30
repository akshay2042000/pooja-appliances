import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { store } from './redux/configureStore';
import { Provider } from 'react-redux';
import ScrollToTop from './components/ScrollToTop';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop />
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

