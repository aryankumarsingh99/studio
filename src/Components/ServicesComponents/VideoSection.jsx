import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';


// Fallback media array for restoration
const media = [
  { id: 1, url: "/video.mp4", category: "drone", type: "video" },
  { id: 8, url: "/image/wedding-img.avif", category: "background", type: "image" }
];

export default function VideoSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  // Parallax effect for background image
  const y = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

    return (
      <section ref={sectionRef} className="relative py-16 lg:py-24 flex items-center justify-center">
        <motion.img
          src={media.find(m => m.id === 8)?.url}
          alt="Studio background"
          className="absolute inset-0 w-full h-full object-cover z-0 blur-md"
          style={{  filter: 'blur(2px)' }}
          loading="lazy"
        />
      
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <div className="relative w-full min-h-125 rounded-2xl overflow-hidden shadow-lg flex items-center">
                <div
                  className="group relative w-full h-full rounded-2xl overflow-hidden border-4 shadow-2xl transition-transform duration-300 hover:scale-105 flex items-center"
                  style={{
                    borderColor: 'white',
                    background: 'rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(50px)',
                    boxShadow: '0 8px 32px 0 rgba(255,0,0,0.25), 0 0 24px 4px #FF0000AA',
                  }}
                >
                  <video
                    controls
                    autoPlay
                    muted
                    loop
                    poster={media.find(m => m.id === 1)?.url}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90 rounded-2xl"
                    style={{ boxShadow: '0 2px 24px 0 rgba(255,0,0,0.10)', minHeight: '500px', maxHeight: '600px' }}
                    preload="auto"
                  >
                    <source src={media.find(m => m.category === 'drone' && m.type === 'video')?.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="40" cy="40" r="38" fill="#FF0000" fillOpacity="0.7"/>
                      <polygon points="32,25 60,40 32,55" fill="#fff" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="md:pl-8"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl text-white lg:text-4xl font-bold mb-6">StudioX Showcase Video</h2>
              <p className="text-white/90 font-bold mb-4">Watch our studio in action and see how we capture unforgettable moments for our clients.</p>
              <p className="text-white/80 font-semibold mb-4">Our team uses state-of-the-art equipment and creative techniques to ensure every shot is perfect. Whether it's a wedding, portrait, or commercial shoot, we bring passion and professionalism to every project.</p>
              <p className="text-white/80 font-semibold">Discover the behind-the-scenes process, meet our talented photographers, and see why StudioX is trusted by hundreds of happy clients. Your story deserves to be told beautifully—let us make it unforgettable.</p>
            </motion.div>
          </div>
        </div>
      </section>
  );
}
