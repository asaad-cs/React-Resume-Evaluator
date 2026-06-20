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
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: '#2d6a4f', color: 'white' }}>
      <h1 style={{ margin: 0, fontSize: '1.4rem', color: 'white' }}>
        <Link to="/evaluator" style={{ color: 'white', textDecoration: 'none' }}>
          Resume Evaluator
        </Link>
      </h1>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem' }}>
              {user.email}
              {user.role === 'admin' && (
                <span style={{ marginLeft: '6px', background: '#f4a261', color: '#1d3557', borderRadius: '4px', padding: '1px 6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  admin
                </span>
              )}
            </span>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: '#95d5b2' }}>Admin Panel</Link>
            )}
            <button
              onClick={handleLogout}
              style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#95d5b2' }}>Login</Link>
            <Link to="/register" style={{ color: '#95d5b2' }}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
