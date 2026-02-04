import React, { useState } from 'react';
import { FaBars, FaStar, FaInfoCircle, FaVideo, FaImage, FaComments, FaPalette, FaThumbsUp, FaUserTie, FaEnvelope, FaMapMarkedAlt, FaBookOpen, FaRegListAlt, FaUserCircle, FaPhotoVideo, FaQuestionCircle, FaNewspaper, FaLayerGroup, FaPeopleCarry, FaCloudUploadAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Sidebar from '../Components/AdminComponents/Sidebar';
import Header from '../Components/AdminComponents/Header';
import Dashboard from '../Components/AdminComponents/Dashboard';
import Users from '../Components/AdminComponents/Users';
import Bookings from '../Components/AdminComponents/Bookings';
import Profile from '../Components/AdminComponents/Profile';
import Settings from '../Components/AdminComponents/Settings';
import PageEditor from '../Components/AdminComponents/PageEditor';

export default function Admin() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('dashboard');
	const sectionIcons = {
		'Hero': <FaStar className="text-[#FF0000] mr-2" />,
		'About Studio': <FaInfoCircle className="text-[#FF0000] mr-2" />,
		'Featured Video': <FaVideo className="text-[#FF0000] mr-2" />,
		'Moodboard': <FaPalette className="text-[#FF0000] mr-2" />,
		'Client Feedback': <FaComments className="text-[#FF0000] mr-2" />,
		'Our Awesome': <FaThumbsUp className="text-[#FF0000] mr-2" />,
		'Professional': <FaUserTie className="text-[#FF0000] mr-2" />,
		'Team': <FaPeopleCarry className="text-[#FF0000] mr-2" />,
		'Features': <FaLayerGroup className="text-[#FF0000] mr-2" />,
		'Showcase': <FaPhotoVideo className="text-[#FF0000] mr-2" />,
		'Newsletter': <FaNewspaper className="text-[#FF0000] mr-2" />,
		'Resources': <FaBookOpen className="text-[#FF0000] mr-2" />,
		'Contact': <FaEnvelope className="text-[#FF0000] mr-2" />,
		'Faq': <FaQuestionCircle className="text-[#FF0000] mr-2" />,
		'Video': <FaVideo className="text-[#FF0000] mr-2" />,
		'Contact Info': <FaEnvelope className="text-[#FF0000] mr-2" />,
		'Map': <FaMapMarkedAlt className="text-[#FF0000] mr-2" />,
		'Booking Form': <FaRegListAlt className="text-[#FF0000] mr-2" />,
		'Event Details': <FaBookOpen className="text-[#FF0000] mr-2" />,
		'User Info': <FaUserCircle className="text-[#FF0000] mr-2" />,
		'Gallery': <FaImage className="text-[#FF0000] mr-2" />,
	};
	const pageSections = {
		home: [
			'Hero',
			'About Studio',
			'Featured Video',
			'Moodboard',
			'Client Feedback',
			'Our Awesome',
			'Professional',
		],
		about: [
			'Hero',
			'Team',
			'Client Feedback',
		],
		services: [
			'Hero',
			'Video',
			'Featured Video',
			'Features',
			'Resources',
			'Team',
		],
		contact: [
			'Hero',
			'Client Feedback',
		],
		book: [
			'Hero',
			'Gallery',
		],
	};

	const [pages] = useState([
		{ key: 'home', name: 'Home' },
		{ key: 'about', name: 'About' },
		{ key: 'services', name: 'Services' },
		{ key: 'contact', name: 'Contact' },
		{ key: 'book', name: 'Book' },
	]);
	const [openPage, setOpenPage] = useState(null);
	const [activeSectionTab, setActiveSectionTab] = useState({
		home: 0,
		about: 0,
		services: 0,
		contact: 0,
		book: 0,
	});
	const [preview, setPreview] = useState({});
	const [uploading, setUploading] = useState({});

	return (
		 <div className="min-h-screen bg-[#18181b] flex relative">
			 {/* Sidebar Toggle (always visible on mobile) */}
			 <button
				 className="fixed top-4 left-4 z-50 bg-[#232326] text-white px-4 py-2 rounded-full shadow-lg border-2 border-[#FF0000] hover:bg-[#FF0000] hover:text-white transition md:hidden"
				 onClick={() => setSidebarOpen((v) => !v)}
				 title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
			 >
				 <FaBars />
			 </button>
			 <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

			<main className="flex-1 flex flex-col min-h-screen md:ml-0 ml-0 md:pl-0 pl-0" style={{ minHeight: '100vh' }}>
				<Header activeTab={activeTab} />
				<section className="flex-1 p-4 md:p-10 overflow-x-auto">
					{activeTab === 'dashboard' && <Dashboard />}
					{activeTab === 'users' && <Users />}
					{activeTab === 'bookings' && <Bookings />}
					{activeTab === 'profile' && <Profile />}
					{activeTab === 'settings' && <Settings />}
					{activeTab === 'pageEditor' && (
						<PageEditor
							pages={pages}
							pageSections={pageSections}
							sectionIcons={sectionIcons}
							openPage={openPage}
							setOpenPage={setOpenPage}
							activeSectionTab={activeSectionTab}
							setActiveSectionTab={setActiveSectionTab}
							preview={preview}
							setPreview={setPreview}
							uploading={uploading}
							setUploading={setUploading}
						/>
					)}
				</section>
			</main>
		</div>
	);
}
