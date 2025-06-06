import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import './style/style.css'

import ScrollToTop from './components/ui/ScrollToTop';

import { SearchProductContextProvider } from './context/SearchProductContextApi';
import { SelectAddressContextProvider } from './context/SelectAddressContextApi';
import { CartEntryCountProvider } from './context/CartEntryCountContextApi';
import { getUser } from './context/CartSlice';
import { MediaQueryContextProvider } from './context/MediaQueryContextApi';
import Spinner from './components/ui/Spinner';

const Homepage = React.lazy(() => import('./pages/Homepage'));
const ProductListingPage = React.lazy(() => import('./pages/category-pages/ProductListingPage'));
const AppLayout = React.lazy(() => import('./components/AppLayout'));
const ProtectedRoute = React.lazy(() => import('./components/ui/ProtectedRoute'));
const MenFashion = React.lazy(() => import('./pages/MenFashion'));
const WomenFashion = React.lazy(() => import('./pages/WomenFashion'));
const ProductDetailsPage = React.lazy(() => import('./pages/ProductDetailsPage'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Address = React.lazy(() => import('./pages/Address'));
const Payment = React.lazy(() => import('./pages/Payment'));
const OrderConfirmation = React.lazy(() => import('./pages/OrderConfirmation'));
const Login = React.lazy(() => import('./pages/Login'));
const YourOrders = React.lazy(() => import('./pages/YourOrders'));
const Profile = React.lazy(() => import('./pages/Profile'));
const SignUp = React.lazy(() => import('./pages/SignUp'));


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
      <Suspense fallback={<Spinner />}>

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
      </Suspense>
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