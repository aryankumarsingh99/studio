// Meet the Team Section
function TeamSection() {
	const team = [
		{ name: "Aarav Maheshwari", role: "Founder & Lead Photographer", img: "/assets/randomuser-men-32.jpg" },
		{ name: "Priya Sharma", role: "Creative Director", img: "/assets/randomuser-women-44.jpg" },
		{ name: "Rohan Patel", role: "Videographer", img: "/assets/randomuser-men-65.jpg" },
		{ name: "Simran Kaur", role: "Client Relations", img: "/assets/randomuser-women-68.jpg" },
	];
	const owner = team[0];
	const members = team.slice(1);
	return (
		<section className="py-20 px-4 bg-[#18181b]">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#FF0000]">Meet the Team</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
					{/* Owner Card: vertical classic with accent and badge */}
					<motion.div
						initial={{ opacity: 0, x: -80 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.9, type: "spring", stiffness: 60 }}
						viewport={{ once: false, amount: 0.3 }}
						className="relative bg-gradient-to-b from-[#232323] to-[#18181b] border-l-8 border-[#FF0000] rounded-3xl shadow-2xl p-10 flex flex-col items-center md:items-start justify-center md:col-span-1 overflow-hidden"
					>
						<span className="absolute top-6 right-6 bg-[#FF0000] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">Owner</span>
						<div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FF0000] opacity-10 rounded-full z-0"></div>
						<img src={owner.img} alt={owner.name} className="w-32 h-32 rounded-full object-cover mb-5 border-4 border-[#FF0000] shadow-xl relative z-10" onError={e => { e.currentTarget.style.display = 'none'; }} />
						<div className="text-2xl font-serif font-bold text-[#FF0000] mb-1 text-center md:text-left relative z-10">{owner.name}</div>
						<div className="text-lg text-gray-200 mb-2 text-center md:text-left relative z-10">{owner.role}</div>
						<div className="text-base text-gray-400 font-serif text-center md:text-left relative z-10">Visionary leader, passionate about capturing stories and building a creative legacy.</div>
					</motion.div>
					{/* Team Members: modern glassmorphic grid with icon overlays and floating effect */}
					<div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
						{members.map((member, idx) => (
							<motion.div
								key={member.name}
								initial={{ opacity: 0, y: 60, scale: 0.95 }}
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ duration: 0.7, type: "spring", stiffness: 60, delay: idx * 0.18 }}
								viewport={{ once: false, amount: 0.3 }}
								className="relative flex flex-col items-center bg-white/5  rounded-2xl shadow-2xl p-7 border-t-4 border-[#FF0000] hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden"
							>
								{/* Floating icon overlay */}
								<span className="absolute -top-4 -right-4 text-4xl text-[#FF0000] opacity-20 z-0">
									{member.role === "Creative Director" ? <FaLightbulb /> : member.role === "Videographer" ? <FaGlobe /> : <FaBuilding />}
								</span>
								<img src={member.img} alt={member.name} className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#FF0000] shadow-lg relative z-10" onError={e => { e.currentTarget.style.display = 'none'; }} />
								<div className="text-lg font-semibold text-white mb-1 relative z-10">{member.name}</div>
								<div className="text-sm text-gray-300 mb-1 relative z-10">{member.role}</div>
								<div className="text-xs text-gray-400 text-center relative z-10">{member.role === "Creative Director" ? "Drives the creative vision and inspires the team." : member.role === "Videographer" ? "Captures moments in motion with artistry." : "Ensures every client feels valued and heard."}</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// Our Values Section
function ValuesSection() {
	const values = [
		{ title: "Creativity", desc: "We believe in pushing creative boundaries to deliver unique and memorable work." },
		{ title: "Integrity", desc: "Honesty and transparency guide every project and client relationship." },
		{ title: "Excellence", desc: "We strive for perfection in every shot, video, and interaction." },
		{ title: "Collaboration", desc: "Teamwork and open communication drive our success." },
		{ title: "Innovation", desc: "We embrace new technologies and ideas to stay ahead." },
		{ title: "Passion", desc: "Our love for our craft drives us to go above and beyond for every client." },
		{ title: "Respect", desc: "We value every individual and foster a culture of mutual respect and inclusivity." },
	];
	// Assign a unique style to each card
	const cardStyles = [
		// Classic
		"bg-[#18181b] border-l-8 border-[#FF0000] rounded-2xl shadow-2xl p-8 flex flex-col justify-center",
		// Glassmorphic
		"bg-[#232323] backdrop-blur-lg rounded-2xl shadow-xl p-8 border-t-4 border-[#FF0000] text-center hover:-translate-y-2 hover:scale-105 transition-all duration-300",
		// Gradient
		"bg-gradient-to-br from-[#232323] to-[#18181b] rounded-2xl shadow-xl p-8 border-b-4 border-[#FF0000] text-center hover:scale-105 transition-all duration-300",
		// Outlined
		"bg-[#232323] border-2 border-dashed border-[#FF0000] rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all duration-300",
		// Accent
		"bg-[#18181b] border-r-8 border-[#FF0000] rounded-2xl shadow-2xl p-8 flex flex-col justify-center",
		// Soft
		"bg-[#232323] border-2 border-[#FF0000] rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-all duration-300"
	];
	return (
		<section className="py-20 px-4 bg-white text-white">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#FF0000]">Our Values</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-stretch">
					{values.map((val, idx) => (
						<motion.div
							key={val.title}
							initial={{ opacity: 0, y: 60 * (idx % 2 === 0 ? 1 : -1), scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 0.7, type: "spring", stiffness: 60, delay: idx * 0.13 }}
							viewport={{ once: false, amount: 0.3 }}
							className={cardStyles[idx % cardStyles.length]}
						>
							<div className="text-xl md:text-2xl font-bold mb-2 text-[#FF0000] font-serif tracking-wide">{val.title}</div>
							<div className="text-gray-200 text-base md:text-lg font-serif">{val.desc}</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaBuilding, FaGlobe, FaLightbulb, FaTrophy } from "react-icons/fa";

// Hero Section
function HeroSection() {
	return (
		<section className="relative min-h-[60vh] flex items-center justify-center py-20 px-4 bg-gradient-to-br from-[#18181b] via-[#232323] to-[#2d2d2d] overflow-hidden">
			{/* Subtle pattern overlay */}
			<div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
				<svg width="100%" height="100%" className="w-full h-full opacity-10" style={{position:'absolute',top:0,left:0}}>
					<defs>
						<pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
							<circle cx="2" cy="2" r="2" fill="#FF0000" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#dots)" />
				</svg>
			</div>
			<div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
				{/* Left: Modern/Classic Heading */}
				<div className="flex flex-col items-start md:items-start text-left">
					<motion.h1
						initial={{ opacity: 0, x: -100, scale: 0.95 }}
						whileInView={{ opacity: 1, x: 0, scale: 1 }}
						transition={{ duration: 1.1, ease: "easeOut" }}
						viewport={{ once: false, amount: 0.5 }}
						className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-[#FF0000] drop-shadow-lg leading-tight"
					>
						<motion.span
							initial={{ opacity: 0, y: -60, scale: 0.92 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
							viewport={{ once: false, amount: 0.5 }}
							className="block font-serif text-white text-2xl md:text-3xl mb-2 tracking-normal"
						>
							Welcome to
						</motion.span>
						<motion.span
							initial={{ opacity: 0, x: 100, scale: 0.92 }}
							whileInView={{ opacity: 1, x: 0, scale: 1 }}
							transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
							viewport={{ once: false, amount: 0.5 }}
							className="block font-serif italic text-[#FF0000] text-5xl md:text-7xl mb-2"
						>
							Our Studio
						</motion.span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 80, scale: 0.96 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
						viewport={{ once: false, amount: 0.5 }}
						className="text-lg md:text-2xl text-gray-200 mb-8 font-light max-w-xl"
					>
						Capturing moments, telling stories, and creating memories that last a lifetime. Discover our journey, vision, and what makes us unique.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, x: 100, scale: 0.95 }}
						whileInView={{ opacity: 1, x: 0, scale: 1 }}
						transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
						viewport={{ once: false, amount: 0.5 }}
						className="flex gap-4 mt-2"
					>
						<a href="#roadmap" className="px-6 py-3 rounded-full bg-[#FF0000] text-white font-bold shadow-lg hover:bg-[#d10000] transition">Our Journey</a>
						<a href="#team" className="px-6 py-3 rounded-full border-2 border-[#FF0000] text-[#FF0000] font-bold bg-transparent hover:bg-[#18181b] transition">Meet the Team</a>
					</motion.div>
				</div>
				{/* Right: Floating logo image with animation */}
				<div className="flex items-center justify-center hover:scale-110 relative w-full h-full min-h-[220px]">
					<motion.div
						initial={{ opacity: 0, y: 40, scale: 0.9 }}
						animate={{ opacity: 1, y: [40, -10, 10, -10, 0], scale: [0.9, 1.05, 1, 1.05, 1] }}
						transition={{ duration: 2.5, type: "spring", stiffness: 40 }}
						className="relative"
					>
						<div className="rounded-full   bg-opacity-20 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center shadow-2xl border-4 border-[#FF0000] overflow-hidden">
							<img
								src="/TMP PSD S.png"
								alt="Studio Logo"
								className="w-28 h-28 md:w-40 md:h-40 object-contain scale-300 drop-shadow-xl"
								style={{ filter: 'drop-shadow(0 4px 24px #FF0000AA)' }}
								onError={e => { e.currentTarget.style.display = 'none'; }}
							/>
						</div>
						{/* Accent ring */}
						<motion.div
							initial={{ scale: 0.8, opacity: 0.5 }}
							animate={{ scale: [0.8, 1.1, 0.95, 1], opacity: [0.5, 0.7, 0.5, 0.7] }}
							transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 md:w-80 md:h-80 border-4 border-dashed border-[#FF0000] rounded-full z-0"
							aria-hidden="true"
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

// Roadmap Section
function RoadmapSection() {
	const steps = [
		{ year: "2018", title: "Founded", desc: "Started as a small team with a big dream." },
		{ year: "2019", title: "First Studio", desc: "Opened our first creative studio and served 100+ clients." },
		{ year: "2021", title: "Expansion", desc: "Expanded services to video, events, and digital content." },
		{ year: "2023", title: "Innovation", desc: "Adopted cutting-edge tech for immersive experiences." },
		{ year: "2026", title: "Today", desc: "A trusted name for creativity, quality, and client satisfaction." },
	];
	const [openIdx, setOpenIdx] = React.useState(null);
	// React icons for each step
	const icons = [
		<FaRocket className="text-[#FF0000]" />, // Founded
		<FaBuilding className="text-[#FF0000]" />, // First Studio
		<FaGlobe className="text-[#FF0000]" />, // Expansion
		<FaLightbulb className="text-[#FF0000]" />, // Innovation
		<FaTrophy className="text-[#FF0000]" />, // Today
	];
	return (
		<section className="py-20 px-4 bg-white">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#FF0000]">Our Journey</h2>
				{/* Mobile (vertical) timeline */}
				<div className="flex flex-col md:hidden relative">
					<div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF0000] to-[#232323] z-0" style={{borderRadius: '4px'}}></div>
					{steps.map((step, idx) => {
						const isOpen = openIdx === idx;
						return (
							<motion.div
								key={step.year}
								initial={{ opacity: 0, x: -40, scale: 0.95 }}
								whileInView={{ opacity: 1, x: 0, scale: 1 }}
								transition={{ duration: 0.7, type: "spring", stiffness: 60, delay: idx * 0.12 }}
								viewport={{ once: false, amount: 0.3 }}
								className="flex items-start relative mb-12"
							>
								{/* Timeline dot and icon */}
								<div className="flex flex-col items-center mr-4 z-10">
									<div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-4 border-[#FF0000] text-2xl text-[#FF0000] shadow-lg mb-2">{icons[idx]}</div>
									<div className="w-3 h-3 rounded-full bg-[#FF0000] mb-1"></div>
								</div>
								{/* Card */}
								<button
									className={`flex-1 flex flex-col items-start px-5 py-6 rounded-2xl bg-[#232323] border border-[#FF0000] shadow-xl focus:outline-none transition-colors duration-200 ${isOpen ? 'bg-[#18181b] border-2' : ''}`}
									onClick={() => setOpenIdx(isOpen ? null : idx)}
									aria-expanded={isOpen}
								>
									<span className="text-xl font-bold text-[#FF0000] mb-1">{step.year}</span>
									<span className="text-lg font-semibold text-white mb-2">{step.title}</span>
									<span className="text-[#FF0000] text-lg font-serif mb-2">{isOpen ? '▼' : '▶'}</span>
									<div
										className={`overflow-hidden transition-all duration-300 text-gray-300 text-base text-left font-serif ${isOpen ? 'max-h-40 py-2' : 'max-h-0 py-0'}`}
										style={{ transitionProperty: 'max-height, padding' }}
									>
										{step.desc}
									</div>
								</button>
							</motion.div>
					);
					})}
				</div>

				{/* Desktop (horizontal) timeline */}
				<div className="hidden md:flex relative flex-col items-center">
					<div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#FF0000] to-[#232323] z-0" style={{transform: 'translateY(-50%)'}}></div>
					<div className="flex flex-row items-center justify-between w-full gap-0 z-10">
						{steps.map((step, idx) => {
							const isOpen = openIdx === idx;
							return (
								<motion.div
									key={step.year}
									initial={{ opacity: 0, y: 60, scale: 0.85 }}
									whileInView={{ opacity: 1, y: 0, scale: 1 }}
									transition={{ duration: 0.7, type: "spring", stiffness: 60, delay: idx * 0.15 }}
									viewport={{ once: false, amount: 0.3 }}
									className="flex flex-col items-center w-full md:w-1/5 relative"
								>
									{/* Icon and dot */}
									<div className="flex flex-col items-center mb-4 md:mb-8">
										<div className="text-4xl md:text-5xl mb-2 flex items-center justify-center">{icons[idx]}</div>
										<div className="w-6 h-6 rounded-full bg-white border-4 border-[#FF0000] flex items-center justify-center text-[#FF0000] font-bold text-lg shadow-lg z-10">{idx+1}</div>
									</div>
									{/* Card */}
									<button
										className={`w-full md:min-w-[180px] md:max-w-[220px] flex flex-col items-center px-4 py-6 rounded-2xl bg-[#232323] border border-[#FF0000] shadow-xl focus:outline-none transition-colors duration-200 ${isOpen ? 'bg-[#18181b] border-2' : ''}`}
										onClick={() => setOpenIdx(isOpen ? null : idx)}
										aria-expanded={isOpen}
									>
										<span className="text-xl font-bold text-[#FF0000] mb-1">{step.year}</span>
										<span className="text-lg font-semibold text-white mb-2">{step.title}</span>
										<span className="text-[#FF0000] text-lg font-serif mb-2">{isOpen ? '▼' : '▶'}</span>
										<div
											className={`overflow-hidden transition-all duration-300 text-gray-300 text-base text-center font-serif ${isOpen ? 'max-h-40 py-2' : 'max-h-0 py-0'}`}
											style={{ transitionProperty: 'max-height, padding' }}
										>
											{step.desc}
										</div>
									</button>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

// Details Section
function DetailsSection() {
	return (
		<section className="py-20 px-4 bg-white text-black">
			<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-center">
				{/* Classic Left Side */}
				<motion.div
					initial={{ opacity: 0, x: -80 }}
					whileInView={{ opacity: 1, x: 0 }}
					whileHover={{ scale: 1.03, boxShadow: "0 8px 32px #FF000080" }}
					transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
					viewport={{ once: false, amount: 0.3 }}
					className="bg-[#232323] border-l-8 border-[#FF0000] rounded-l-2xl p-8 shadow-xl flex flex-col h-full justify-center"
				>
					<h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-[#FF0000] tracking-wider">What Makes Us Different?</h3>
					<ul className="list-disc pl-6 space-y-3 text-lg text-gray-200 font-serif">
						<li>Personalized approach to every project</li>
						<li>State-of-the-art equipment and creative techniques</li>
						<li>Passionate, experienced, and friendly team</li>
						<li>Commitment to quality and client satisfaction</li>
						<li>Wide range of services: photography, videography, editing, and more</li>
					</ul>
				</motion.div>
				{/* Modern Middle Card */}
				<motion.div
					initial={{ opacity: 0, y: 80 }}
					whileInView={{ opacity: 1, y: 0 }}
					whileHover={{ scale: 1.03, boxShadow: "0 8px 32px #FF000080" }}
					transition={{ duration: 0.7, type: "spring", stiffness: 60, delay: 0.2 }}
					viewport={{ once: false, amount: 0.3 }}
					className="flex flex-col items-center justify-center h-full"
				>
					<div className="bg-[#18181b] rounded-2xl shadow-2xl border-t-4 border-[#FF0000] p-8 w-full flex flex-col items-center">
						<div className="mb-4 text-[#FF0000] text-4xl">
							<FaGlobe />
						</div>
						<h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF0000]">About This Website</h3>
						<p className="text-lg text-gray-200 mb-4 text-center">Our website is designed to be your creative gateway. Explore our portfolio, book sessions, and connect with us seamlessly. Built with modern technologies for a fast, secure, and beautiful experience.</p>
						<ul className="list-none space-y-2 text-gray-300 text-center">
							<li><span className="font-semibold text-white">Built with:</span> React, Vite, Tailwind CSS</li>
							<li><span className="font-semibold text-white">Features:</span> Online booking, admin dashboard, client feedback, and more</li>
							<li><span className="font-semibold text-white">Optimized for:</span> Speed, accessibility, and mobile devices</li>
						</ul>
					</div>
				</motion.div>
				{/* New Right Card: Our Promise */}
				<motion.div
					initial={{ opacity: 0, x: 80 }}
					whileInView={{ opacity: 1, x: 0 }}
					whileHover={{ scale: 1.03, boxShadow: "0 8px 32px #FF000080" }}
					transition={{ duration: 0.7, type: "spring", stiffness: 60, delay: 0.4 }}
					viewport={{ once: false, amount: 0.3 }}
					className="flex flex-col items-center justify-center h-full"
				>
					<div className="bg-[#232323] rounded-2xl shadow-2xl border-b-4 border-[#FF0000] p-8 w-full flex flex-col items-center">
						<div className="mb-4 text-[#FF0000] text-4xl">
							<FaTrophy />
						</div>
						<h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF0000]">Our Promise</h3>
						<p className="text-lg text-gray-200 mb-4 text-center">We promise to deliver not just photos and videos, but memories that last a lifetime. Your satisfaction and joy are our highest priorities, and we strive to exceed your expectations at every step.</p>
						<ul className="list-none space-y-2 text-gray-300 text-center">
							<li><span className="font-semibold text-white">Guarantee:</span> 100% satisfaction or your session is free</li>
							<li><span className="font-semibold text-white">Support:</span> Friendly, responsive, and always here for you</li>
							<li><span className="font-semibold text-white">Legacy:</span> Creating stories for generations</li>
						</ul>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

export default function About() {
	return (
		<main className="bg-[#18181b] min-h-screen">
			<HeroSection />
			<RoadmapSection />
			<DetailsSection />
			<TeamSection />
			<ValuesSection />
		</main>
	);
}
