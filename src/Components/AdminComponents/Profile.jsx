import React from 'react';
import { FaUser } from 'react-icons/fa';

export default function Profile() {
  return (
    <div className="bg-[#18181b] rounded-2xl p-4 md:p-8 shadow text-white flex flex-col items-center">
      <FaUser className="text-4xl md:text-5xl text-[#FF0000] mb-4" />
      <h2 className="text-xl md:text-2xl font-bold mb-2">Admin</h2>
      <p className="text-gray-400 mb-2 text-sm md:text-base">admin@maheshwaripicture.com</p>
      <p className="text-gray-400 text-sm md:text-base">Role: Super Admin</p>
    </div>
  );
}
