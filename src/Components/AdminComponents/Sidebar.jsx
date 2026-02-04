import React from 'react';
import { FaCamera, FaChartBar, FaUsers, FaCalendarAlt, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) {
  return (
    <aside
      className={`fixed md:static top-0 left-0 h-full w-64 bg-[#232326] text-white flex flex-col py-8 px-4 shadow-2xl animate-fade-in transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}
      style={{ minHeight: '100vh' }}
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-[#FF0000] text-xl font-bold md:hidden"
        onClick={() => setSidebarOpen(false)}
        title="Hide sidebar"
      >
        ×
      </button>
      <div className="flex items-center gap-3 mb-10">
        <FaCamera className="text-3xl text-[#FF0000]" />
        <span className="text-2xl font-bold tracking-wide">Admin Panel</span>
      </div>
      <nav className="flex flex-col gap-2">
        <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === 'dashboard' ? 'bg-[#FF0000]' : 'hover:bg-[#FF0000]/80'}`} onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}><FaChartBar /> Dashboard</button>
        <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === 'users' ? 'bg-[#FF0000]' : 'hover:bg-[#FF0000]/80'}`} onClick={() => { setActiveTab('users'); setSidebarOpen(false); }}><FaUsers /> Users</button>
        <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === 'bookings' ? 'bg-[#FF0000]' : 'hover:bg-[#FF0000]/80'}`} onClick={() => { setActiveTab('bookings'); setSidebarOpen(false); }}><FaCalendarAlt /> Bookings</button>
        <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === 'profile' ? 'bg-[#FF0000]' : 'hover:bg-[#FF0000]/80'}`} onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }}><FaUser /> Profile</button>
        <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === 'settings' ? 'bg-[#FF0000]' : 'hover:bg-[#FF0000]/80'}`} onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}><FaCog /> Settings</button>
        <button className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === 'pageditor' ? 'bg-[#FF0000]' : 'hover:bg-[#FF0000]/80'}`} onClick={() => { setActiveTab('pageEditor'); setSidebarOpen(false); }}><FaCamera /> Page Editor</button>
        <button className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition mt-8"><FaSignOutAlt /> Logout</button>
      </nav>
    </aside>
  );
}
