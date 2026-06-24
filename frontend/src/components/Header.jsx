import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <h1 className="site-header-logo">
        <Link to="/evaluator">Resume Evaluator</Link>
      </h1>

      <nav className="site-header-nav">
        {user ? (
          <>
            <span className="nav-user-email">
              {user.email}
              {user.role === 'admin' && (
                <span className="nav-admin-badge">admin</span>
              )}
            </span>
            {user.role === 'admin' && (
              <Link to="/admin" className="nav-link">Admin Panel</Link>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
