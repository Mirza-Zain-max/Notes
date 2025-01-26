import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Forgot from 'Pages/Auth/Forgot'
import Auth from '../../Auth';
import Login from 'Pages/Auth/Login'
import Register from 'Pages/Auth/Regsiter'
import { useAuthContext } from 'Contexts/Auth'
import MyDashBoard from '..'

const Index = () => {
  const { isAuth } = useAuthContext()
  return (
    <>
        <Routes>
          <Route path="/*" element={<MyDashBoard />} />
          {/* <Route path='/auth/*' element={<Auth />}> */}
          <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot' element={<Forgot />} />
          </Route>
        </Routes>
    </>
  );
};

export default Index;