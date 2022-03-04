import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Outlets/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SingleProductPage from './pages/SingleProductPage';
import NotFoundPage from './pages/NotFoundPage';
import { useEffect } from 'react';
import AdminPage from './pages/AdminPage';
import AppliancesOutlet from './components/Outlets/AppliancesOutlet';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCompaniesThunk } from './redux/companySlice';
import { setAppliances } from './redux/applianceSlice';
import { fetchCategoriesThunk } from './redux/categorySlice';
import UsersPage from './pages/admin/UsersPage';
import OrdersPage from './pages/admin/OrdersPage';
import BillsPage from './pages/admin/BillsPage';
import SingleOrderPage from './pages/admin/SingleOrderPage';
import SingleBillPage from './pages/admin/SingleBillPage';
import PrivateRoute from './utils/protectedRoute';
import AdminHomePage from './pages/admin/AdminHomePage';

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
                <Route path='/' element={<Navigate to="/creative" />} />
                <Route element={<Layout />} >
                    <Route path=':app' element={<AppliancesOutlet />}>
                        <Route index element={<HomePage />} />
                        <Route path='products'>
                            <Route index element={<ProductsPage />} />
                            <Route path=':productId' element={<SingleProductPage />} />
                        </Route>
                        <Route path='cart' element={<CartPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Route>
                <Route path=':app' element={<AppliancesOutlet />}>
                    <Route path='login' element={<LoginPage />} />
                </Route>


                <Route path='admin' element={
                    <PrivateRoute>
                        <AdminPage />
                    </PrivateRoute>
                } >
                    <Route index element={<AdminHomePage />} />
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
                    <Route path='bills'  >
                        <Route index element={<BillsPage />} />
                        <Route path=':billId' element={<SingleBillPage />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ThemeProvider >
    );
}

export default App;
