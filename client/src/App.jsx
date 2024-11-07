import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin/layout'
import AdminDashboard from './pages/admin/dashboard'
import AdminProducts from './pages/admin/products'
import AdminOrders from './pages/admin/orders'
import ShoppingLayout from './components/shopping/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping/home'
import ShoppingListing from './pages/shopping/listing'
import ShoppingCheckout from './pages/shopping/checkout'
import ShoppingAccount from './pages/shopping/account'
import CheckAuth from "./components/common/check-auth";
import UnauthPage from './pages/unauth';
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping/paypal-return";
import PaymentSuccessPage from './pages/shopping/payment-success';
import SearchProducts from './pages/shopping/search'
import AdminUsers from './pages/admin/users'

function App() {

  const { user, isAuthenticated, isLoading} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  },[dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col bg-white h-[100vh] m-0 p-0 overflow-auto">
      <Routes>
      <Route path="/" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        </CheckAuth>}/>
        <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>}>
          <Route path='login' element={<AuthLogin/>} />
          <Route path='register' element={<AuthRegister/>} />
        </Route>

        <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>}>
          <Route path='dashboard' element={<AdminDashboard/>} />
          <Route path='products' element={<AdminProducts/>} />
          <Route path='orders' element={<AdminOrders/>} />
          <Route path='users' element={<AdminUsers/>} />
        </Route>

        <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>}>
          <Route path='home' element={<ShoppingHome/>} />  
          <Route path='listing' element={<ShoppingListing/>} />
          <Route path='checkout' element={<ShoppingCheckout/>} />
          <Route path='account' element={<ShoppingAccount/>} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage/>} />
          <Route path="search" element={<SearchProducts/>} />
        </Route>

        <Route path='*' element={<NotFound/>}/>

        <Route path='/unauth' element={<UnauthPage/>}/>

      </Routes>
    </div>
  )
}

export default App
