import React from 'react';
import { FaCog } from 'react-icons/fa';

export default function Settings() {
  return (
    <div className="bg-[#18181b] rounded-2xl p-4 md:p-8 shadow text-white">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2"><FaCog /> Settings</h2>
      <p className="text-gray-400 text-sm md:text-base">Settings content goes here...</p>
    </div>
  );
}
