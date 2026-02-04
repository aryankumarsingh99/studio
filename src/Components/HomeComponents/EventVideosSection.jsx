import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EVENT_VIDEOS = [
  {
    title: "Wedding Moments",
    video: "/wedding.mp4",
    image: "/wedding.jpg",
    description: "Capturing the joy, love, and timeless memories of your special day with cinematic artistry.",
  },
  {
    title: "Birthday Bash",
    video: "/birthday.mp4",
    image: "/birthday.jpg",
    description:
      "Relive the fun, laughter, and excitement of your birthday celebrations in vibrant detail.",
  },
  {
    title: "Graduation Day",
    video: "/Graduation.mp4",
    image: "/graduation.jpg",
    description:
      "Cherish the pride and achievement of graduation with a film that tells your story.",
  },
  {
    title: "Anniversary Love",
    video: "/anniversary.mp4",
    image: "/anniversary.jpg",
    description:
      "Celebrate years of togetherness with a classic, heartfelt anniversary video.",
  },
  {
    title: "Festival Vibes",
    video: "/Festival.mp4",
    image: "/festival.jpg",
    description:
      "Experience the color, energy, and tradition of festivals through our creative lens.",
  },
];

function EventVideosSection() {
  const [modalVideo, setModalVideo] = useState(null);
  const sectionRef = useRef(null);
  // Parallax scroll effect for background
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);
  return (
    <motion.section
      ref={sectionRef}
      className="bg-[#18181b] py-10 px-4 md:px-0 relative overflow-hidden"
      style={{ y }}
    >
      {/* Optional: animated background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 60% 40%, #ff000033 0%, #18181b 80%)",
          opacity: 0.7,
          y: y,
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight font-serif">
          Event Video Highlights
        </h2>
        <p className="text-center text-gray-300 text-lg mb-10 font-medium max-w-2xl mx-auto">
          Explore our curated collection of event videos, capturing unforgettable moments with creativity, style, and cinematic flair. Each story is brought to life with our signature touch.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {EVENT_VIDEOS.map((event, idx) => (
            <div
              key={idx}
              className="bg-white/5 rounded-xl shadow-lg flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-300 group relative border-0"
            >
              <div className="px-6 pt-6 pb-2">
                <span className="inline-block bg-transparent text-[#FF0000] font-serif italic font-extrabold text-xl tracking-wide mb-2">
                  {event.title}
                </span>
              </div>
              <div className="relative w-full h-64 flex items-center justify-center">
                <video
                  src={event.video}
                  poster={event.image}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ borderRadius: '0.75rem 0.75rem 0 0' }}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-gray-200 font-medium mb-4 min-h-15 drop-shadow-sm text-base">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
        {modalVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative w-full max-w-2xl mx-auto">
              <button
                className="absolute top-2 right-2 z-10 bg-white/80 text-[#FF0000] rounded-full p-2 shadow hover:bg-[#FF0000] hover:text-white transition"
                onClick={() => setModalVideo(null)}
                aria-label="Close video"
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className="w-6 h-6"><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
              </button>
              <video
                src={modalVideo}
                controls
                autoPlay
                className="w-full h-90 md:h-120 rounded-2xl shadow-2xl bg-black"
              />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

export default EventVideosSection;
 

