import React from 'react';
import { FaUser } from 'react-icons/fa';

export default function Header({ activeTab }) {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-6 bg-[#232326] shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h1>
      <div className="flex items-center gap-4 md:gap-6">
        <FaUser className="text-2xl text-[#FF0000]" />
        <span className="text-white font-semibold text-sm md:text-base">Admin</span>
      </div>
    </header>
  );
}
