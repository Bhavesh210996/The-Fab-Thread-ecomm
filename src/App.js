import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout';
import './style/style.css'
import MenFashion from './pages/MenFashion';
import Homepage from './pages/Homepage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import WomenFashion from './pages/WomenFashion';
import MensCasualWear from './pages/category-pages/MensCasualWear';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { Toaster } from 'react-hot-toast';
import Cart from './pages/Cart';
import { CartEntryCountProvider } from './context/CartEntryCountContextApi';
import Address from './pages/Address';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { SelectAddressContextProvider } from './context/SelectAddressContextApi';
import YourOrders from './pages/YourOrders';
import { SearchProductContextProvider } from './context/SearchProductContextApi';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import ScrollToTop from './components/ui/ScrollToTop';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProductContextProvider>
      <CartEntryCountProvider>
      <SelectAddressContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>

          <Route element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path=':categoryName' element={<MensCasualWear />} />
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
    </SelectAddressContextProvider>
    </CartEntryCountProvider>
    </SearchProductContextProvider>
      </QueryClientProvider>
  )
}

export default App;


//creating rating column in orders table

//creating review column in orders table as object with keys review and date

//creating rating column in products table as object with keys from 1 to 5

//creating review column in products table as object with keys, review, userName, date