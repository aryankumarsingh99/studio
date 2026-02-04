import { motion } from 'framer-motion';

export default function FeaturedVideoSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="aspect-5/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FF0000]">
              <video
                src="girl.mp4"
                className="object-cover w-full h-full"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center items-start"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-[#FF0000] font-extrabold mb-6">Celebrating Timeless Beauty</h2>
            <p className="text-black font-semibold text-lg mb-4">Meet our beautiful lady—graceful, confident, and radiant. At StudioX, we believe true beauty shines from within, and our lens is dedicated to capturing her elegance, charm, and individuality. Every portrait tells her story, highlighting her poise and the sparkle in her eyes.</p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li>Showcasing natural elegance and confidence</li>
              <li>Expert styling and creative direction</li>
              <li>Capturing genuine smiles and expressions</li>
              <li>Portraits that celebrate her unique beauty</li>
            </ul>
            <p className="text-[#FF0000] font-semibold">Let us capture your beauty and create portraits you'll cherish forever.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
