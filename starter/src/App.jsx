// src/App.jsx
import { useState } from 'react'
import Header from './components/Header'
import EvaluatorPage from './pages/EvaluatorPage'
import './App.css'
import Body from './components/Body'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { Routes, Route, NavLink, Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <RegisterPage />
      <Header/>
     <Body />
   
      <Routes>
      <Route path="/" element={Header}/>
       <Route path="/" element={Body}/>
       <Route path="/" element={LoginPage}/>
 <Route path="/" element={EvaluatorPage}/>
    </Routes>

<NavLink to="/main">clickto head</NavLink>
<NavLink to="/Body">click to body</NavLink>
<NavLink to="/EvaluatorPage">click to EvaluatorPage</NavLink>


<Outlet />
    </>
  )
}

export default App;