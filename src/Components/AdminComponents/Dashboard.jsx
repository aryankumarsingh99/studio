import React, { useEffect, useMemo, useState } from 'react';
import { FaUsers, FaCalendarAlt, FaCamera, FaCheckCircle } from 'react-icons/fa';
import { apiClient } from '../../services/api';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await apiClient.getBookings();
        const list = Array.isArray(response) ? response : response.bookings || [];
        setBookings(list);
      } catch (err) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const recentBookings = useMemo(() => {
    return bookings.slice(0, 3).map((booking) => {
      const dateValue = booking.eventDate ? new Date(booking.eventDate) : null;
      const dateLabel = dateValue && !Number.isNaN(dateValue.getTime())
        ? dateValue.toLocaleDateString()
        : 'Unknown date';
      return {
        id: booking._id,
        title: booking.eventType || 'Session',
        name: booking.name || 'Client',
        date: dateLabel,
        status: booking.status || 'pending'
      };
    });
  }, [bookings]);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-gradient-to-br from-[#232326] to-[#18181b] rounded-2xl p-8 shadow-xl flex flex-col items-center border border-[#333]">
          <FaUsers className="text-4xl text-[#FF0000] mb-3" />
          <div className="text-3xl font-extrabold text-white">1,200</div>
          <div className="text-gray-400 text-base mt-1">Total Users</div>
        </div>
        <div className="bg-gradient-to-br from-[#232326] to-[#18181b] rounded-2xl p-8 shadow-xl flex flex-col items-center border border-[#333]">
          <FaCalendarAlt className="text-4xl text-[#FF0000] mb-3" />
          <div className="text-3xl font-extrabold text-white">{loading ? '...' : bookings.length}</div>
          <div className="text-gray-400 text-base mt-1">Bookings</div>
        </div>
        <div className="bg-gradient-to-br from-[#232326] to-[#18181b] rounded-2xl p-8 shadow-xl flex flex-col items-center border border-[#333]">
          <FaCamera className="text-4xl text-[#FF0000] mb-3" />
          <div className="text-3xl font-extrabold text-white">45</div>
          <div className="text-gray-400 text-base mt-1">Active Shoots</div>
        </div>
      </div>
      {/* Chart and Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Chart Placeholder */}
        <div className="md:col-span-2 bg-[#232326] rounded-2xl p-6 shadow-xl border border-[#333] flex flex-col justify-center items-center min-h-[220px]">
          <div className="w-full flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-white">Bookings Trend</span>
            <span className="text-xs text-gray-400">(Last 6 months)</span>
          </div>
          <div className="w-full h-32 flex items-center justify-center">
            {/* Replace this with a real chart if needed */}
            <span className="text-gray-500 italic">[Chart Placeholder]</span>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="bg-[#232326] rounded-2xl p-6 shadow-xl border border-[#333] flex flex-col">
          <span className="text-lg font-bold text-white mb-4">Recent Activity</span>
          <ul className="space-y-3 text-sm">
            {loading && (
              <li className="text-gray-400">Loading recent bookings...</li>
            )}
            {!loading && recentBookings.length === 0 && (
              <li className="text-gray-400">No bookings yet.</li>
            )}
            {recentBookings.map((booking) => (
              <li key={booking.id} className="flex items-center gap-2 text-gray-300">
                <FaCalendarAlt className="text-[#FF0000]" />
                <span className="font-semibold text-white capitalize">{booking.title}</span>
                <span>for</span>
                <span className="font-semibold text-white">{booking.name}</span>
                <span className="text-gray-400">({booking.date})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
