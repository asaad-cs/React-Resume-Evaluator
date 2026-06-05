import { Routes, Route, NavLink } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EvaluatorPage from './pages/EvaluatorPage';
import './App.css';

function App() {
  return (
    <>
      <Header />
      
      
      <nav style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/body">Body</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/evaluator">Evaluator</NavLink>
      </nav>

    
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/body" element={<Body />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/evaluator" element={<EvaluatorPage />} />
      </Routes>
    </>
  );
}

export default App;