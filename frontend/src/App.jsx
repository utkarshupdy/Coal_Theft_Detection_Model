import './App.css'
// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-500'>
      <Header />
      <main className='w-full pt-8'> {/* Add padding-top here */}
        <div className=''>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App