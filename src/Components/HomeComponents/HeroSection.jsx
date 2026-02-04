import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BG_IMAGES = [
	"/image/herobg1.avif",
	"/image/herobg2.avif",
  "/image/herobg3.avif",
  "/image/herobg4.avif",
  "/image/herobg5.avif"
	 
 ];


export default function HeroSection() {
	const [bgIdx, setBgIdx] = useState(0);
	const sectionRef = useRef(null);
	// Parallax scroll effect for background
	const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
	const y = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

	useEffect(() => {
		const interval = setInterval(() => {
			setBgIdx((prev) => (prev + 1) % BG_IMAGES.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
			<section ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pb-16 md:pb-24">
				{/* Full background image, auto-changing, with parallax scroll */}
				<motion.img
					src={BG_IMAGES[bgIdx]}
					alt="Classic Modern Hero Background"
					className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-1000"
					loading="lazy"
					draggable="false"
					style={{ y }}
				/>
				{/* Dark overlay for contrast */}
				<div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/40 to-black/70 z-10" />
				{/* Two-column layout */}
				<div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4 py-12">
					{/* Left: Main hero content */}
					<div className="flex-1 flex flex-col items-center md:items-start gap-8">
						<motion.h1
							className="text-5xl md:text-7xl font-serif font-bold text-white text-left drop-shadow-2xl mb-4 tracking-tight"
							initial={{ opacity: 0, y: -40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1.2, delay: 0.5 }}
						>
							Timeless Memories, Modern Artistry
						</motion.h1>
						<motion.p
							className="text-lg md:text-2xl text-white/90 text-left font-serif font-light mb-6 max-w-2xl"
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1.2, delay: 1 }}
						>
							Experience the elegance of classic photography blended with the creativity of modern design. We capture your story with passion, style, and a touch of timeless sophistication.
						</motion.p>
						<div className="flex flex-row items-center gap-4 w-full md:w-auto">
							<motion.button
								className="px-6 py-3 rounded-full hover:text-[#FF0000] bg-[#FF0000] text-white font-bold shadow-lg hover:border-white hover:bg-white transition"
								whileHover={{ scale: 1.08, boxShadow: '0 0 24px #FF0000' }}
								whileTap={{ scale: 0.96 }}
								onClick={() => window.location.href = '/services'}
							>
								View Our Services
							</motion.button>
							<motion.button
								className="px-6 py-3 rounded-full border-2 bg-white text-[#FF0000] font-bold hover:text-white shadow-lg hover:bg-[#FF0000]  transition"
								whileHover={{ scale: 1.08, boxShadow: '0 0 24px #FF0000' }}
								whileTap={{ scale: 0.96 }}
								onClick={() => window.location.href = '/book'}
							>
								Book Now
							</motion.button>
						</div>
					</div>
					{/* Right: Studio/Photography content */}
					<div className="flex-1 flex flex-col items-center md:items-start gap-6">
						<div className="text-white/80 text-base font-serif font-light mb-2 text-center md:text-left">
							Welcome to our creative studio, where every click captures a memory. We specialize in:
						</div>
						<ul className="text-white/80 text-base list-disc pl-6 space-y-1 text-left">
							<li className="font-serif">Portrait Photography</li>
							<li className="font-serif">Event & Wedding Shoots</li>
							<li className="font-serif">Studio Lighting & Backdrops</li>
							<li className="font-serif">Product & Commercial Photography</li>
							<li className="font-serif">Family & Group Sessions</li>
						</ul>
					</div>
				</div>
			</section>
		);
}

