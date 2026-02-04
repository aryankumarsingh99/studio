import { motion } from 'framer-motion';

export default function ResourcesSection({ resources, Plus, ArrowUpRight }) {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
             <h2 className="text-3xl lg:text-4xl text-[#FF0000] font-bold text-foreground mt-2">Photography Tips & Guides</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Explore our guides to get the most out of your photoshoot, learn about lighting, posing, and how to prepare for your big day in the studio.
            </p>
          </div>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, idx) => (
            <motion.div
              key={idx}
              className="group cursor-pointer"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.09 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 shadow-md">
                <img src={resource.image || "/placeholder.svg"} alt={resource.title} className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-foreground group-hover:text-teal transition-colors">{resource.title}</h3>
                <ArrowUpRight className="w-5 h-5 text-[#FF0000] text-teal shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
