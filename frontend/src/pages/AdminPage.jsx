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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ background: '#2d6a4f', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', color: '#333' }}>{u.email}</td>
              <td style={{ padding: '10px', color: '#333' }}>{u.role}</td>
              <td style={{ padding: '10px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => updateRole(u.email, u.role === 'admin' ? 'user' : 'admin')}
                  style={{ padding: '4px 10px', cursor: 'pointer' }}
                >
                  Make {u.role === 'admin' ? 'User' : 'Admin'}
                </button>
                <button
                  onClick={() => deleteUser(u.email)}
                  style={{ padding: '4px 10px', cursor: 'pointer', background: '#e63946', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
