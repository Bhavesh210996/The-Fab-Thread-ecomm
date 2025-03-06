import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import './style/style.css'

import AppLayout from './components/AppLayout';
import MenFashion from './pages/MenFashion';
import Homepage from './pages/Homepage';
import WomenFashion from './pages/WomenFashion';
import ProductListingPage from './pages/category-pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Cart from './pages/Cart';
import Address from './pages/Address';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import ProtectedRoute from './components/ui/ProtectedRoute';
import YourOrders from './pages/YourOrders';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import ScrollToTop from './components/ui/ScrollToTop';

import { SearchProductContextProvider } from './context/SearchProductContextApi';
import { SelectAddressContextProvider } from './context/SelectAddressContextApi';
import { CartEntryCountProvider } from './context/CartEntryCountContextApi';
import Header from './components/Header/Header';
import { getUser } from './context/CartSlice';
import { MediaQueryContextProvider } from './context/MediaQueryContextApi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getUser());
  }, [dispatch])
  
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProductContextProvider>
      {/* <CartEntryCountProvider> */}
      {/* <SelectAddressContextProvider> */}
      <MediaQueryContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
      <ScrollToTop />
      <Header />
        <Routes>

          <Route element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path=':categoryName' element={<ProductListingPage />} />
            <Route path='men' element={<MenFashion />} />
            <Route path='women' element={<WomenFashion />} />
            <Route path=':productType/:brand/:productName/:productId' element={<ProductDetailsPage />} />
          </Route>
          <Route element={<ProtectedRoute> <AppLayout /> </ProtectedRoute>}>
            <Route path='cart' element={<Cart />} />
            <Route path='address' element={<Address />} />
            <Route path='payment' element={<Payment />} />
            <Route path='orderConfirmation/:orderId' element={<OrderConfirmation />} />
            <Route path='orders' element={<YourOrders />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
            
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" gutter={12} containerStyle={{margin: "8px"}} toastOptions={{
        success:{
          duration: 3000,
        },
        error: {
          duration: 5000
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)"
        }
      }} />
      </MediaQueryContextProvider>
    {/* </SelectAddressContextProvider> */}
    {/* </CartEntryCountProvider> */}
    </SearchProductContextProvider>
    </QueryClientProvider>
  )
}

export default App;