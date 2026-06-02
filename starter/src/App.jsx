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
    <Header></Header>
    <Body />
     
   
   
      <Routes>
      
       <Route path="/Body" element={<Body/>}/>
       <Route path="/LoginPage" element={<LoginPage/>}/>
        <Route path="/RegisterPage" element={<RegisterPage/>}/>
 <Route path="/EvaluatorPage" element={<EvaluatorPage/>}/>
    </Routes>

<NavLink to="/main">clickto head</NavLink>
<NavLink to="/Body">click to body</NavLink>
<NavLink to="/EvaluatorPage">click to EvaluatorPage</NavLink>
<NavLink to="/RegisterPage">click to RegisterPage</NavLink>


<Outlet />
    </>
  )
}

export default App;