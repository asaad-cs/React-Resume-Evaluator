import { useState, useEffect } from 'react';
import client from '../api/client';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await client.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load users');
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateRole = async (email, newRole) => {
    try {
      await client.patch(`/admin/users/${encodeURIComponent(email)}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update role');
    }
  };

  const deleteUser = async (email) => {
    if (!window.confirm(`Delete ${email}?`)) return;
    try {
      await client.delete(`/admin/users/${encodeURIComponent(email)}`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete user');
    }
  };

  return (
    <main>
      <h1>Admin Panel</h1>
      {error && <div className="error-banner">{error}</div>}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '28px', color: '#333', opacity: 0.6 }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.email}>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-role"
                      onClick={() => updateRole(u.email, u.role === 'admin' ? 'user' : 'admin')}
                    >
                      Make {u.role === 'admin' ? 'User' : 'Admin'}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteUser(u.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
