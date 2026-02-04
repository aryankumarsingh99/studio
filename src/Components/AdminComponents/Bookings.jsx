import React, { useEffect, useMemo, useState } from 'react';
import { FaCalendarAlt, FaImage } from 'react-icons/fa';
import { apiClient } from '../../services/api';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState({});
  const [actionError, setActionError] = useState({});
  const [viewingImages, setViewingImages] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await apiClient.getBookings();
        const list = Array.isArray(response) ? response : response.bookings || [];
        console.log('Loaded bookings:', list);
        console.log('First booking referenceImages:', list[0]?.referenceImages);
        setBookings(list);
      } catch (err) {
        setError('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const rows = useMemo(() => {
    return bookings.map((booking) => {
      const dateValue = booking.eventDate ? new Date(booking.eventDate) : null;
      const dateLabel = dateValue && !Number.isNaN(dateValue.getTime())
        ? dateValue.toLocaleDateString()
        : '-';
      
      const refImages = booking.referenceImages || [];
      console.log(`Booking ${booking._id} has ${refImages.length} reference images:`, refImages);
      
      return {
        id: booking._id,
        event: booking.eventType || 'Session',
        date: dateLabel,
        client: booking.name || 'Unknown',
        status: booking.status || 'pending',
        email: booking.email || '',
        phone: booking.phone || '',
        notes: booking.notes || '',
        referenceImages: refImages
      };
    });
  }, [bookings]);

  const handleFieldChange = (id, field, value) => {
    setBookings((prev) => prev.map((booking) => (booking._id === id ? { ...booking, [field]: value } : booking)));
  };

  const handleSave = async (booking) => {
    const id = booking._id;
    setSaving((prev) => ({ ...prev, [id]: true }));
    setActionError((prev) => ({ ...prev, [id]: '' }));
    try {
      const response = await apiClient.updateBooking(id, {
        status: booking.status,
        notes: booking.notes
      });
      if (response && response.booking) {
        setBookings((prev) => prev.map((b) => (b._id === id ? response.booking : b)));
      }
    } catch (err) {
      setActionError((prev) => ({ ...prev, [id]: 'Update failed.' }));
    } finally {
      setSaving((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDelete = async (booking) => {
    if (!window.confirm(`Delete booking for ${booking.name || 'client'}?`)) return;
    const id = booking._id;
    setSaving((prev) => ({ ...prev, [id]: true }));
    setActionError((prev) => ({ ...prev, [id]: '' }));
    try {
      await apiClient.deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setActionError((prev) => ({ ...prev, [id]: 'Delete failed.' }));
    } finally {
      setSaving((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="bg-[#18181b] rounded-2xl p-4 md:p-8 shadow text-white">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2"><FaCalendarAlt /> Bookings</h2>
      {loading && <div className="text-gray-400 text-sm">Loading...</div>}
      {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
      
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {!loading && rows.length === 0 && (
          <div className="text-gray-400 text-center py-8">No bookings yet.</div>
        )}
        {rows.map((row) => (
          <div key={row.id} className="bg-[#232326] rounded-lg p-4 border border-[#333]">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">{row.client}</h3>
                <p className="text-sm text-gray-400 capitalize">{row.event}</p>
              </div>
              <select
                value={row.status}
                onChange={(e) => handleFieldChange(row.id, 'status', e.target.value)}
                className={`text-xs px-2 py-1 rounded border border-[#333] bg-[#18181b] ${row.status === 'confirmed' ? 'text-green-500' : row.status === 'completed' ? 'text-blue-400' : row.status === 'cancelled' ? 'text-red-400' : 'text-yellow-400'}`}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📅</span>
                <span>{row.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📧</span>
                <span className="text-gray-300">{row.email || '-'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📞</span>
                <span className="text-gray-300">{row.phone || '-'}</span>
              </div>
            </div>
            
            <div className="mb-3">
              <label className="text-xs text-gray-400 mb-1 block">Notes</label>
              <input
                value={row.notes}
                onChange={(e) => handleFieldChange(row.id, 'notes', e.target.value)}
                className="bg-transparent border border-[#333] rounded px-2 py-1 text-white w-full text-sm"
                placeholder="Add notes"
              />
            </div>
            
            {row.referenceImages && row.referenceImages.length > 0 && (
              <div className="mb-3">
                <button
                  onClick={() => setViewingImages({ id: row.id, images: row.referenceImages })}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm w-full justify-center"
                >
                  <FaImage />
                  View {row.referenceImages.length} Image{row.referenceImages.length > 1 ? 's' : ''}
                </button>
              </div>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const booking = bookings.find((b) => b._id === row.id);
                  if (booking) handleSave(booking);
                }}
                disabled={saving[row.id]}
                className={`flex-1 px-3 py-2 rounded text-sm border border-[#FF0000] ${saving[row.id] ? 'bg-gray-600 text-gray-300' : 'bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000]'}`}
              >
                {saving[row.id] ? 'Saving...' : '💾 Save'}
              </button>
              <button
                onClick={() => {
                  const booking = bookings.find((b) => b._id === row.id);
                  if (booking) handleDelete(booking);
                }}
                disabled={saving[row.id]}
                className="flex-1 px-3 py-2 rounded text-sm border border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                🗑️ Delete
              </button>
            </div>
            {actionError[row.id] && (
              <div className="text-xs text-red-400 mt-2">{actionError[row.id]}</div>
            )}
          </div>
        ))}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#333]">
              <th className="py-2 px-4">Event</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Client</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Notes</th>
              <th className="py-2 px-4">Images</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && rows.length === 0 && (
              <tr>
                <td className="py-3 px-4 text-gray-400" colSpan={8}>No bookings yet.</td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-[#2a2a2f] hover:bg-[#232326] transition">
                <td className="py-2 px-4 capitalize">{row.event}</td>
                <td className="py-2 px-4">{row.date}</td>
                <td className="py-2 px-4">{row.client}</td>
                <td className="py-2 px-4">
                  <div className="text-sm text-gray-300">{row.email || '-'}</div>
                  <div className="text-sm text-gray-400">{row.phone || '-'}</div>
                </td>
                <td className="py-2 px-4">
                  <select
                    value={row.status}
                    onChange={(e) => handleFieldChange(row.id, 'status', e.target.value)}
                    className={`bg-[#18181b] border border-[#333] rounded px-2 py-1 ${row.status === 'confirmed' ? 'text-green-500' : row.status === 'completed' ? 'text-blue-400' : row.status === 'cancelled' ? 'text-red-400' : 'text-yellow-400'}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <input
                    value={row.notes}
                    onChange={(e) => handleFieldChange(row.id, 'notes', e.target.value)}
                    className="bg-transparent border border-[#333] rounded px-2 py-1 text-white w-full"
                    placeholder="Add notes"
                  />
                </td>
                <td className="py-2 px-4">
                  {row.referenceImages && row.referenceImages.length > 0 ? (
                    <button
                      onClick={() => setViewingImages({ id: row.id, images: row.referenceImages })}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      <FaImage />
                      {row.referenceImages.length} Image{row.referenceImages.length > 1 ? 's' : ''}
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">No images</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => {
                        const booking = bookings.find((b) => b._id === row.id);
                        if (booking) handleSave(booking);
                      }}
                      disabled={saving[row.id]}
                      className={`px-3 py-1 rounded text-sm border border-[#FF0000] ${saving[row.id] ? 'bg-gray-600 text-gray-300' : 'bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000]'}`}
                    >
                      {saving[row.id] ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        const booking = bookings.find((b) => b._id === row.id);
                        if (booking) handleDelete(booking);
                      }}
                      disabled={saving[row.id]}
                      className="px-3 py-1 rounded text-sm border border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                  {actionError[row.id] && (
                    <div className="text-xs text-red-400 mt-1">{actionError[row.id]}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Viewer Modal */}
      {viewingImages && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setViewingImages(null)}>
          <div className="bg-[#18181b] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Reference Images</h3>
              <button
                onClick={() => setViewingImages(null)}
                className="text-white hover:text-red-500 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {viewingImages.images.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000${imageUrl}`}
                    alt={`Reference ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg border-2 border-[#333] hover:border-[#FF0000] transition-all"
                  />
                  <a
                    href={imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000${imageUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Open Full Size
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
