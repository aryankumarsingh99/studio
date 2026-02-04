// Fallback OUR_AWESOME_IMAGES array for restoration
const OUR_AWESOME_IMAGES = [
  { url: "/public/image/D4.webp", alt: "Awesome 1" },
  { url: "/public/image/A1.webp", alt: "Awesome 2" },
  { url: "/public/image/A2.webp", alt: "Awesome 3" },
  { url: "/public/image/B1.webp", alt: "Awesome 4" },
  { url: "/public/image/B2.webp", alt: "Awesome 5" },
  { url: "/public/image/C1.webp", alt: "Awesome 6" },
  { url: "/public/image/D7.webp", alt: "Awesome 7" },
  { url: "/public/image/D1.webp", alt: "Awesome 8" }
];

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
 
export default function Professional() {
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % OUR_AWESOME_IMAGES.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#18181b]  relative overflow-hidden">
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.5" fill="#fff" opacity="0.10" />
            </pattern>
            <radialGradient id="fade2" cx="180%" cy="150%" r="80%">
              <stop offset="60%" stopColor="#fff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
          <rect width="100%" height="100%" fill="url(#fade2)" />
        </svg>
      </div>
      <div className="container mx-auto px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-20 items-center px-2 sm:px-4 md:px-0">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-5xl font-light text-white mb-6">
              <span className="font-extrabold font-mono tracking-[0.35em] text-4xl text-[#FFC371]" style={{fontFamily: 'Fira Mono, monospace', letterSpacing: '0.35em'}}>[ OUR AWESOME</span>
              <br />
              <span className="text-[#FF0000] font-bold ml-16 font-serif tracking-widest italic text-6xl" style={{fontFamily: 'Merriweather, serif'}}>WORK</span>
              <span className="text-white"> ]</span>
            </h2>
            <p className="text-gray-300 font-medium text-base leading-relaxed mb-6">
              Experience the art of photography with a focus on quality, creativity, and storytelling. We capture your most cherished moments with precision and passion, turning memories into timeless works of art.
            </p>
            <p className="text-gray-300 font-medium text-base leading-relaxed mb-10">
              Our team is dedicated to delivering exceptional images that reflect your unique story. From portraits to events, we blend technical expertise with an artistic eye to ensure every shot is picture-perfect.
            </p>
            <p className="text-gray-300 font-medium text-base leading-relaxed mb-10">
              We pride ourselves on professionalism and client satisfaction, using advanced equipment and innovative techniques to bring your vision to life. Trust us to make every moment unforgettable.
            </p>
            <p className="text-gray-300 font-medium text-base leading-relaxed mb-10">
              From creative direction to meticulous post-production, we handle every detail with care. Our goal is to build lasting relationships and deliver images you’ll treasure for a lifetime.
            </p>
            <button
              className="relative font-semibold px-12 py-4 rounded-full border-2 border-[#FF0000] text-[#FF0000] bg-transparent uppercase tracking-widest overflow-hidden transition-all duration-300 group shadow-md hover:bg-[#FF0000] hover:text-white hover:shadow-xl"
              onClick={() => navigate('/services')}
            >
              <span className="absolute inset-0 bg-[#FF0000] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
              <span className="relative z-10">See More Work</span>
            </button>
          </div>
          {/* Right Side - Full Image */}
          <div className="relative w-full flex justify-center items-center">
            <img
              src={OUR_AWESOME_IMAGES[currentImg]?.url}
              alt={OUR_AWESOME_IMAGES[currentImg]?.alt}
              className="w-full max-w-2xl rounded-3xl shadow-2xl object-cover transition-all duration-700"
              loading="lazy"
              onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png'; }}
            />
            {/* Dots for navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {OUR_AWESOME_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border border-white ${currentImg === idx ? 'bg-[#FF0000]' : 'bg-white/40'}`}
                  onClick={() => setCurrentImg(idx)}
                  aria-label={`Show image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}