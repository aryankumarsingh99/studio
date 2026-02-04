import React, { useState } from 'react';
import { FaEye, FaEdit, FaFileDownload, FaTimesCircle, FaUser, FaHistory, FaSignOutAlt, FaCog, FaCreditCard, FaCalendarAlt, FaUserEdit } from 'react-icons/fa';

export default function Profile() {
	// Example user data (replace with real data/fetch in real app)
	const [user, setUser] = useState({
		name: 'Maheshwari User',
		email: 'user@maheshwaripicture.com',
		role: 'Photographer',
		avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
		bio: 'Capturing moments, creating memories. Passionate about photography and storytelling.'
	});
	const [editing, setEditing] = useState(false);
	const [form, setForm] = useState(user);
	const [activePanel, setActivePanel] = useState('profile');
	const [showAvatarInput, setShowAvatarInput] = useState(false);

	// Handle avatar file change
	const handleAvatarChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				setUser((prev) => ({ ...prev, avatar: ev.target.result }));
				setForm((prev) => ({ ...prev, avatar: ev.target.result }));
				setShowAvatarInput(false);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleEdit = () => {
		setEditing(true);
		setForm(user);
	};
	const handleCancel = () => setEditing(false);
	const handleSave = () => {
		setUser(form);
		setEditing(false);
	};

		return (
			<div className="min-h-screen bg-[#18181b] flex flex-col md:flex-row items-stretch py-8 px-2 md:px-8">
				{/* Leftside Panel */}
				<aside className="w-full md:w-64 bg-[#232326] rounded-2xl shadow-xl p-6 flex flex-col gap-8 mb-8 md:mb-0 md:mr-8 animate-fade-in">
					<div className="flex flex-col items-center">
						<img
							src={user.avatar}
							alt="Avatar"
							className="w-20 h-20 rounded-full border-4 border-[#FF0000] shadow-lg object-cover bg-white mb-2"
						/>
						<h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
						<p className="text-sm text-gray-400 mb-2">{user.role}</p>
					</div>
					<nav className="flex flex-col gap-2">
						<button
							className={`flex items-center gap-3 text-left px-4 py-2 rounded-lg text-white transition font-medium ${activePanel === 'profile' ? 'bg-[#FF0000]' : 'hover:bg-[#FF0000]/80'}`}
							onClick={() => setActivePanel('profile')}
						>
							<FaUser /> Profile
						</button>
						<button
							className={`flex items-center gap-3 text-left px-4 py-2 rounded-lg text-white transition font-medium ${activePanel === 'bookings' ? 'bg-[#FF0000]' : 'hover:bg-[#FF0000]/80'}`}
							onClick={() => setActivePanel('bookings')}
						>
							<FaCalendarAlt /> My Bookings
						</button>
						<button
							className={`flex items-center gap-3 text-left px-4 py-2 rounded-lg text-white transition font-medium ${activePanel === 'history' ? 'bg-[#FF0000]' : 'hover:bg-[#FF0000]/80'}`}
							onClick={() => setActivePanel('history')}
						>
							<FaHistory /> History
						</button>
						<button className="flex items-center gap-3 text-left px-4 py-2 rounded-lg text-white hover:bg-[#FF0000]/80 transition font-medium">
							<FaCreditCard /> Payment
						</button>
						<button className="flex items-center gap-3 text-left px-4 py-2 rounded-lg text-white hover:bg-[#FF0000]/80 transition font-medium">
							<FaCog /> Settings
						</button>
						<button className="flex items-center gap-3 text-left px-4 py-2 rounded-lg text-white hover:bg-gray-700 transition font-medium mt-4">
							<FaSignOutAlt /> Logout
						</button>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 flex flex-col items-center">
					{activePanel === 'profile' && (
						<div className="w-full max-w-7xl bg-[#232326] rounded-2xl shadow-2xl p-12 animate-fade-in flex flex-col gap-10">
							{/* Profile Card */}
							<div className="flex flex-col md:flex-row md:items-center md:gap-12">
								<div className="relative flex-shrink-0 flex justify-center md:block">
									<div className="relative group">
										<img
											src={user.avatar}
											alt="Avatar"
											className="w-32 h-32 rounded-full border-4 border-[#FF0000] shadow-lg object-cover bg-white"
										/>
										<button
											type="button"
											className="absolute bottom-2 right-2 bg-[#FF0000] text-white rounded-full p-2 shadow-lg flex items-center justify-center group-hover:scale-110 transition"
											title="Change profile image"
											onClick={() => setShowAvatarInput((v) => !v)}
										>
											<FaUserEdit />
										</button>
										{showAvatarInput && (
											<input
												type="file"
												accept="image/*"
												className="absolute left-1/2 -translate-x-1/2 bottom-[-2.5rem] w-40 text-xs bg-white text-black rounded shadow p-1 z-20"
												style={{ zIndex: 30 }}
												onChange={handleAvatarChange}
												onClick={e => e.stopPropagation()}
											/>
										)}
									</div>
								</div>
								<div className="mt-10 md:mt-0 w-full text-center md:text-left">
									{editing ? (
										<>
											<input
												className="text-3xl font-bold bg-transparent border-b-2 border-[#FF0000] text-white text-center md:text-left mb-2 w-full outline-none focus:border-white transition"
												value={form.name}
												onChange={e => setForm({ ...form, name: e.target.value })}
											/>
											<input
												className="text-lg bg-transparent border-b border-[#FF0000] text-gray-300 text-center md:text-left mb-2 w-full outline-none focus:border-white transition"
												value={form.email}
												onChange={e => setForm({ ...form, email: e.target.value })}
											/>
											<input
												className="text-base bg-transparent border-b border-[#FF0000] text-gray-400 text-center md:text-left mb-2 w-full outline-none focus:border-white transition"
												value={form.role}
												onChange={e => setForm({ ...form, role: e.target.value })}
											/>
											<textarea
												className="bg-transparent border-b border-[#FF0000] text-gray-300 text-center md:text-left mb-4 w-full outline-none focus:border-white transition resize-none"
												value={form.bio}
												onChange={e => setForm({ ...form, bio: e.target.value })}
												rows={2}
											/>
										</>
									) : (
										<>
											<h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
											<p className="text-lg text-gray-300 mb-1">{user.email}</p>
											<p className="text-base text-[#FF0000] font-semibold mb-2">{user.role}</p>
											<p className="text-gray-400 mb-4">{user.bio}</p>
										</>
									)}
									<div className="flex justify-center md:justify-start gap-4 mt-2">
										{editing ? (
											<>
												<button onClick={handleSave} className="bg-[#FF0000] text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#FF0000] transition">Save</button>
												<button onClick={handleCancel} className="bg-gray-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-500 transition">Cancel</button>
											</>
										) : (
											<button onClick={handleEdit} className="bg-[#FF0000] text-white px-8 py-2 rounded-full font-semibold hover:bg-white hover:text-[#FF0000] transition flex items-center gap-2"><FaUserEdit /> Edit Profile</button>
										)}
									</div>
								</div>
							</div>

							{/* Recent Activity Section */}
							<div className="w-full mt-12 bg-[#232326] rounded-2xl shadow-lg p-8 animate-fade-in flex flex-col gap-6">
								<h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><FaHistory /> Recent Activity</h3>
								<ul className="space-y-4">
									<li className="flex items-center gap-4">
										<span className="w-3 h-3 rounded-full bg-[#FF0000] inline-block"></span>
										<span className="text-gray-300">Booked a photoshoot for 28 Jan 2026</span>
									</li>
									<li className="flex items-center gap-4">
										<span className="w-3 h-3 rounded-full bg-[#FF0000] inline-block"></span>
										<span className="text-gray-300">Uploaded new portfolio images</span>
									</li>
									<li className="flex items-center gap-4">
										<span className="w-3 h-3 rounded-full bg-[#FF0000] inline-block"></span>
										<span className="text-gray-300">Updated profile information</span>
									</li>
								</ul>
							</div>
						</div>
					)}
					{activePanel === 'bookings' && (
						<div className="w-full max-w-7xl bg-[#232326] rounded-2xl shadow-2xl p-12 animate-fade-in flex flex-col gap-10">
							<h3 className="text-3xl font-bold text-white mb-6">My Bookings</h3>
							<ul className="space-y-8">
								{/* Booking 1 */}
								<li className="flex flex-col md:flex-row md:items-center md:gap-8 border-b border-[#333] pb-8">
									<div className="flex-1">
										<div className="flex items-center gap-4 mb-2">
											<span className="text-[#FF0000] font-semibold text-xl">Wedding Photoshoot</span>
											<span className="bg-green-700 text-white text-xs px-3 py-1 rounded-full ml-2">Confirmed</span>
										</div>
										<div className="text-gray-300 mb-1">Date: <span className="font-semibold">28 Jan 2026</span></div>
										<div className="text-gray-400 mb-1">Location: <span className="font-semibold">Hotel Grand, Bhubaneswar</span></div>
										<div className="text-gray-400 mb-1">Package: <span className="font-semibold">Premium (Full Day, 2 Photographers, Album)</span></div>
										<div className="text-gray-400 mb-1">Contact: <span className="font-semibold">+91 98765 43210</span></div>
										<div className="text-gray-400">Notes: <span className="font-normal">Bride entry at 7pm, candid shots requested.</span></div>
									</div>
									<div className="flex flex-row flex-wrap gap-3 items-end mt-4 md:mt-0">
										<button className="flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-[#FF0000] transition mb-2">
											<FaEye /> View
										</button>
										<button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition mb-2">
											<FaEdit /> Edit
										</button>
										<button className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-500 transition mb-2">
											<FaFileDownload /> Invoice
										</button>
										<button className="flex items-center gap-2 bg-red-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-red-800 transition mb-2">
											<FaTimesCircle /> Cancel
										</button>
									</div>
								</li>
								{/* Booking 2 */}
								<li className="flex flex-col md:flex-row md:items-center md:gap-8 border-b border-[#333] pb-8">
									<div className="flex-1">
										<div className="flex items-center gap-4 mb-2">
											<span className="text-[#FF0000] font-semibold text-xl">Corporate Event</span>
											<span className="bg-yellow-700 text-white text-xs px-3 py-1 rounded-full ml-2">Pending</span>
										</div>
										<div className="text-gray-300 mb-1">Date: <span className="font-semibold">15 Feb 2026</span></div>
										<div className="text-gray-400 mb-1">Location: <span className="font-semibold">Tech Park, Cuttack</span></div>
										<div className="text-gray-400 mb-1">Package: <span className="font-semibold">Standard (Half Day, 1 Photographer)</span></div>
										<div className="text-gray-400 mb-1">Contact: <span className="font-semibold">+91 91234 56789</span></div>
										<div className="text-gray-400">Notes: <span className="font-normal">Stage coverage, group photos after lunch.</span></div>
									</div>
									<div className="flex flex-row flex-wrap gap-3 items-end mt-4 md:mt-0">
										<button className="flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-[#FF0000] transition mb-2">
											<FaEye /> View
										</button>
										<button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition mb-2">
											<FaEdit /> Edit
										</button>
										<button className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-500 transition mb-2">
											<FaFileDownload /> Invoice
										</button>
										<button className="flex items-center gap-2 bg-red-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-red-800 transition mb-2">
											<FaTimesCircle /> Cancel
										</button>
									</div>
								</li>
								{/* Booking 3 */}
								<li className="flex flex-col md:flex-row md:items-center md:gap-8 border-b border-[#333] pb-8">
									<div className="flex-1">
										<div className="flex items-center gap-4 mb-2">
											<span className="text-[#FF0000] font-semibold text-xl">Birthday Party</span>
											<span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full ml-2">Cancelled</span>
										</div>
										<div className="text-gray-300 mb-1">Date: <span className="font-semibold">5 Mar 2026</span></div>
										<div className="text-gray-400 mb-1">Location: <span className="font-semibold">Home, Bhubaneswar</span></div>
										<div className="text-gray-400 mb-1">Package: <span className="font-semibold">Basic (2 Hours, 1 Photographer)</span></div>
										<div className="text-gray-400 mb-1">Contact: <span className="font-semibold">+91 99887 77665</span></div>
										<div className="text-gray-400">Notes: <span className="font-normal">Cancelled by client due to illness.</span></div>
									</div>
									<div className="flex flex-row flex-wrap gap-3 items-end mt-4 md:mt-0">
										<button className="flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-[#FF0000] transition mb-2">
											<FaEye /> View
										</button>
										<button className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition mb-2">
											<FaEdit /> Edit
										</button>
										<button className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-500 transition mb-2">
											<FaFileDownload /> Invoice
										</button>
										<button className="flex items-center gap-2 bg-red-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-red-800 transition mb-2">
											<FaTimesCircle /> Cancel
										</button>
									</div>
								</li>
							</ul>
						</div>
					)}
					{activePanel === 'history' && (
						<div className="w-full max-w-7xl bg-[#232326] rounded-2xl shadow-2xl p-12 animate-fade-in flex flex-col gap-10">
							<h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3"><FaHistory /> History</h3>
							<ul className="space-y-8">
								<li className="flex flex-col md:flex-row md:items-center md:gap-8 border-b border-[#333] pb-8">
									<div className="flex-1">
										<div className="flex items-center gap-4 mb-2">
											<span className="text-[#FF0000] font-semibold text-xl">Wedding Photoshoot</span>
											<span className="bg-green-700 text-white text-xs px-3 py-1 rounded-full ml-2">Completed</span>
										</div>
										<div className="text-gray-300 mb-1">Date: <span className="font-semibold">12 Jan 2026</span></div>
										<div className="text-gray-400 mb-1">Location: <span className="font-semibold">Hotel Grand, Bhubaneswar</span></div>
										<div className="text-gray-400 mb-1">Package: <span className="font-semibold">Premium</span></div>
										<div className="text-gray-400">Notes: <span className="font-normal">Album delivered, client gave 5-star feedback.</span></div>
									</div>
									<div className="flex flex-row flex-wrap gap-3 items-end mt-4 md:mt-0">
										<button className="flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-[#FF0000] transition mb-2">
											<FaEye /> View
										</button>
										<button className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-500 transition mb-2">
											<FaFileDownload /> Invoice
										</button>
									</div>
								</li>
								<li className="flex flex-col md:flex-row md:items-center md:gap-8 border-b border-[#333] pb-8">
									<div className="flex-1">
										<div className="flex items-center gap-4 mb-2">
											<span className="text-[#FF0000] font-semibold text-xl">Corporate Meetup</span>
											<span className="bg-green-700 text-white text-xs px-3 py-1 rounded-full ml-2">Completed</span>
										</div>
										<div className="text-gray-300 mb-1">Date: <span className="font-semibold">2 Dec 2025</span></div>
										<div className="text-gray-400 mb-1">Location: <span className="font-semibold">Tech Park, Cuttack</span></div>
										<div className="text-gray-400 mb-1">Package: <span className="font-semibold">Standard</span></div>
										<div className="text-gray-400">Notes: <span className="font-normal">Group photos, event highlights delivered.</span></div>
									</div>
									<div className="flex flex-row flex-wrap gap-3 items-end mt-4 md:mt-0">
										<button className="flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-[#FF0000] transition mb-2">
											<FaEye /> View
										</button>
										<button className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-500 transition mb-2">
											<FaFileDownload /> Invoice
										</button>
									</div>
								</li>
								<li className="flex flex-col md:flex-row md:items-center md:gap-8 border-b border-[#333] pb-8">
									<div className="flex-1">
										<div className="flex items-center gap-4 mb-2">
											<span className="text-[#FF0000] font-semibold text-xl">Portfolio Update</span>
											<span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full ml-2">Info</span>
										</div>
										<div className="text-gray-300 mb-1">Date: <span className="font-semibold">20 Nov 2025</span></div>
										<div className="text-gray-400 mb-1">Location: <span className="font-semibold">Studio</span></div>
										<div className="text-gray-400 mb-1">Package: <span className="font-semibold">N/A</span></div>
										<div className="text-gray-400">Notes: <span className="font-normal">Added new client work to portfolio.</span></div>
									</div>
									<div className="flex flex-row flex-wrap gap-3 items-end mt-4 md:mt-0">
										<button className="flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-[#FF0000] transition mb-2">
											<FaEye /> View
										</button>
									</div>
								</li>
							</ul>
						</div>
					)}
				</main>
			</div>
		);
}
