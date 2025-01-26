import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Regsiter'
import Frogot from './Forgot'

const index = () => {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot' element={<Frogot />} />
      </Routes>

    </>
  )
}

export default index