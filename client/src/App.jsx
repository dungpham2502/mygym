import { useState } from 'react'
import './App.css'
import { Home } from './pages/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { SignUp } from './pages/Signup'
import { LogIn } from './pages/Login'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/'   element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path='/signup' element={!user ? <SignUp /> : <Navigate to="/" />}  />
            <Route path='/login' element={!user ? <LogIn /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
