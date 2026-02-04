import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { apiClient } from '../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState({});
  const [actionError, setActionError] = useState({});

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await apiClient.getUsers();
        const list = Array.isArray(response) ? response : response.users || [];
        setUsers(list);
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleFieldChange = (id, field, value) => {
    setUsers((prev) => prev.map((user) => (user._id === id ? { ...user, [field]: value } : user)));
  };

  const handleSave = async (user) => {
    const id = user._id;
    setSaving((prev) => ({ ...prev, [id]: true }));
    setActionError((prev) => ({ ...prev, [id]: '' }));
    try {
      const response = await apiClient.updateUser(id, {
        name: user.name,
        role: user.role,
        status: user.status
      });
      if (response && response.user) {
        setUsers((prev) => prev.map((u) => (u._id === id ? response.user : u)));
      }
    } catch (err) {
      setActionError((prev) => ({ ...prev, [id]: 'Update failed.' }));
    } finally {
      setSaving((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user ${user.email}?`)) return;
    const id = user._id;
    setSaving((prev) => ({ ...prev, [id]: true }));
    setActionError((prev) => ({ ...prev, [id]: '' }));
    try {
      await apiClient.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setActionError((prev) => ({ ...prev, [id]: 'Delete failed.' }));
    } finally {
      setSaving((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="bg-[#18181b] rounded-2xl p-4 md:p-8 shadow text-white">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2"><FaUsers /> Users</h2>
      {loading && <div className="text-gray-400 text-sm">Loading...</div>}
      {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
      
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {!loading && users.length === 0 && (
          <div className="text-gray-400 text-center py-8">No users yet.</div>
        )}
        {users.map((user) => (
          <div key={user.email} className="bg-[#232326] rounded-lg p-4 border border-[#333]">
            <div className="mb-3">
              <label className="text-xs text-gray-400 mb-1 block">Name</label>
              <input
                value={user.name || ''}
                onChange={(e) => handleFieldChange(user._id, 'name', e.target.value)}
                className="bg-transparent border border-[#333] rounded px-3 py-2 text-white w-full focus:border-[#FF0000] focus:outline-none"
                placeholder="Enter name"
              />
            </div>
            
            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📧</span>
                <span className="text-gray-300">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📅</span>
                <span className="text-gray-400">
                  Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Role</label>
                <select
                  value={user.role || 'client'}
                  onChange={(e) => handleFieldChange(user._id, 'role', e.target.value)}
                  className="bg-[#18181b] border border-[#333] rounded px-2 py-2 text-white capitalize focus:border-[#FF0000] focus:outline-none cursor-pointer w-full text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="photographer">Photographer</option>
                  <option value="client">Client</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Status</label>
                <select
                  value={user.status || 'active'}
                  onChange={(e) => handleFieldChange(user._id, 'status', e.target.value)}
                  className={`bg-[#18181b] border border-[#333] rounded px-2 py-2 capitalize focus:border-[#FF0000] focus:outline-none cursor-pointer font-semibold w-full text-sm ${user.status === 'active' ? 'text-green-500' : user.status === 'blocked' ? 'text-red-400' : 'text-yellow-400'}`}
                >
                  <option value="active">✓ Active</option>
                  <option value="pending">⏳ Pending</option>
                  <option value="blocked">✕ Blocked</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3 p-3 bg-[#18181b] rounded">
              <div className="text-center flex-1">
                <div className="text-2xl font-bold text-[#FF0000]">{user.totalBookings ?? 0}</div>
                <div className="text-xs text-gray-400">Bookings</div>
              </div>
              <div className="w-px h-10 bg-[#333]"></div>
              <div className="text-center flex-1">
                <div className="text-xs font-semibold text-gray-300">
                  {user.lastBookingAt ? new Date(user.lastBookingAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Never'}
                </div>
                <div className="text-xs text-gray-400">Last Booking</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleSave(user)}
                disabled={saving[user._id]}
                className={`flex-1 px-3 py-2 rounded text-sm border-2 border-[#FF0000] font-semibold transition ${saving[user._id] ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000]'}`}
              >
                {saving[user._id] ? 'Saving...' : '💾 Save'}
              </button>
              <button
                onClick={() => handleDelete(user)}
                disabled={saving[user._id]}
                className="flex-1 px-3 py-2 rounded text-sm border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-semibold transition"
              >
                🗑️ Delete
              </button>
            </div>
            {actionError[user._id] && (
              <div className="text-xs text-red-400 mt-2">{actionError[user._id]}</div>
            )}
          </div>
        ))}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#333]">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Total Bookings</th>
              <th className="py-2 px-4">Last Booking</th>
              <th className="py-2 px-4">Joined</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && users.length === 0 && (
              <tr>
                <td className="py-3 px-4 text-gray-400" colSpan={8}>No users yet.</td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.email} className="border-b border-[#2a2a2f] hover:bg-[#232326] transition">
                <td className="py-3 px-4">
                  <input
                    value={user.name || ''}
                    onChange={(e) => handleFieldChange(user._id, 'name', e.target.value)}
                    className="bg-transparent border border-[#333] rounded px-2 py-1 text-white w-full focus:border-[#FF0000] focus:outline-none"
                    placeholder="Enter name"
                  />
                </td>
                <td className="py-3 px-4 text-gray-300">{user.email}</td>
                <td className="py-3 px-4">
                  <select
                    value={user.role || 'client'}
                    onChange={(e) => handleFieldChange(user._id, 'role', e.target.value)}
                    className="bg-[#18181b] border border-[#333] rounded px-3 py-1 text-white capitalize focus:border-[#FF0000] focus:outline-none cursor-pointer"
                  >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="photographer">Photographer</option>
                    <option value="client">Client</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={user.status || 'active'}
                    onChange={(e) => handleFieldChange(user._id, 'status', e.target.value)}
                    className={`bg-[#18181b] border border-[#333] rounded px-3 py-1 capitalize focus:border-[#FF0000] focus:outline-none cursor-pointer font-semibold ${user.status === 'active' ? 'text-green-500' : user.status === 'blocked' ? 'text-red-400' : 'text-yellow-400'}`}
                  >
                    <option value="active">✓ Active</option>
                    <option value="pending">⏳ Pending</option>
                    <option value="blocked">✕ Blocked</option>
                  </select>
                </td>
                <td className="py-2 px-4 text-center">
                  <span className="inline-block bg-[#FF0000]/20 text-[#FF0000] px-2 py-1 rounded font-bold">
                    {user.totalBookings ?? 0}
                  </span>
                </td>
                <td className="py-2 px-4 text-sm text-gray-300">
                  {user.lastBookingAt ? new Date(user.lastBookingAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                </td>
                <td className="py-2 px-4 text-sm text-gray-400">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleSave(user)}
                      disabled={saving[user._id]}
                      className={`px-4 py-2 rounded text-sm border-2 border-[#FF0000] font-semibold transition ${saving[user._id] ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000]'}`}
                    >
                      {saving[user._id] ? 'Saving...' : '💾 Save'}
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      disabled={saving[user._id]}
                      className="px-4 py-2 rounded text-sm border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-semibold transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                  {actionError[user._id] && (
                    <div className="text-xs text-red-400 mt-2 font-semibold">{actionError[user._id]}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
