import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes';
import { Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import BillingPage from './pages/BillingPage';
import LoginPage from './pages/LoginPage';
import SingleProductPage from './pages/SingleProductPage';
import NotFoundPage from './pages/NotFoundPage';
import { Children, useEffect } from 'react';
import MainPage from './pages/MainPage';
import Appliances from './components/Appliances';

function App() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<MainPage />} />
                    <Route path=':app' element={<Appliances />}>
                        <Route index element={<HomePage />} />
                        <Route path='products'>
                            <Route index element={<ProductsPage />} />
                            <Route path=':productId' element={<SingleProductPage />} />
                        </Route>
                        <Route path='cart' element={<CartPage />} />
                        <Route path='bill' element={<BillingPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </ThemeProvider >
    );
}

export default App;
