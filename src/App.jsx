import React from 'react'
import Sidebar from './components/Sidebar'
import HomePage from './Pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Favorite from './Pages/Favorite'

const App = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favorites' element={<Favorite />} />
      </Routes>
    </div>
  )
}

export default App
