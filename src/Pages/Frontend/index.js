import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyTodos from './Todos/MyTodos'
import Add from './Todos/Add'
import Profile from './Todos/Profile'
import NavHeader from 'Components/NavHeader/NavHeader'



const MyDashBoard = () => {
  return (
    <>
    <NavHeader/>
       <main >
      <Routes>
       <Route path='/' element={<Add />} />
        <Route path='/todos/myTodos' element={<MyTodos />} />
        <Route path='/todos/profile' element={<Profile />} />
      </Routes>
       </main>
    </>
  )
}

export default MyDashBoard