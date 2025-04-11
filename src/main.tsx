import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Formulario from './pages/Formulario.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/formulario' element={<Formulario />} />
    </Routes>
  </BrowserRouter>
</React.StrictMode>,
)
