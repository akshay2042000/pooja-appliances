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
import { useEffect } from 'react';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import Appliances from './components/Appliances';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCompaniesThunk } from './redux/companySlice';
import { setAppliances } from './redux/applianceSlice';
import { fetchCategoriesThunk } from './redux/categorySlice';
import UsersPage from './pages/admin/UsersPage';
import OrdersPage from './pages/admin/OrdersPage';
import BillsPage from './pages/admin/BillsPage';
import SingleOrderPage from './pages/admin/SingleOrderPage';

function App() {
    const dispatch = useDispatch();
    let { pathname } = useLocation();
    pathname = pathname.split('/')[1];
    const { currentUser } = useSelector(state => state.userState);

    useEffect(() => {
        dispatch(fetchCompaniesThunk(pathname));
        dispatch(fetchCategoriesThunk(pathname));
        dispatch(setAppliances(pathname));
    }, [pathname, currentUser])

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<MainPage />} />
                </Route>
                <Route element={<Layout />} >
                    <Route path=':app' element={<Appliances />}>
                        <Route index element={<HomePage />} />
                        <Route path='products'>
                            <Route index element={<ProductsPage />} />
                            <Route path=':productId' element={<SingleProductPage />} />
                        </Route>
                        <Route path='cart' element={<CartPage />} />
                        <Route path='bill' element={<BillingPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Route>
                <Route path=':app' element={<Appliances />}>
                    <Route path='login' element={<LoginPage />} />
                </Route>
                <Route path='admin' element={<AdminPage />} >
                    <Route index element={<NotFoundPage />} />
                    <Route path='products' element={<NotFoundPage />} />
                    <Route path='categories' element={<NotFoundPage />} />
                    <Route path='users'  >
                        <Route index element={<UsersPage />} />
                        <Route path='users/:userId' element={<NotFoundPage />} />
                    </Route>
                    <Route path='orders'>
                        <Route index element={<OrdersPage />} />
                        <Route path=':orderId' element={<SingleOrderPage />} />
                    </Route>
                    <Route path='bills' element={<BillsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ThemeProvider >
    );
}

export default App;
