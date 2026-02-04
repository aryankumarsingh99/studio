import { motion } from 'framer-motion';

export default function TeamSection({ team }) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm text-[#FF0000]">[ Meet Our Team ]</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-black mt-2">Our Professional Photographers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-background rounded-2xl p-8 flex flex-col items-center border border-border shadow-md"
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.13 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ perspective: 800 }}
            >
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#FF0000]" loading="lazy" />
              <h3 className="text-xl font-bold text-black mb-1">{member.name}</h3>
              <p className="text-muted-foreground mb-2">{member.role}</p>
              <p className="text-gray-600 text-center text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
