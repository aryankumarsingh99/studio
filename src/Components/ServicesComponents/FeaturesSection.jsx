import { motion } from 'framer-motion';

export default function FeaturesSection({ features, navigate, Button }) {
  return (
    <section className="py-10 lg:py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-sm text-[#FF0000]">[ Our Services ]</span>
          <h2 id="photography-services" className="text-3xl lg:text-4xl font-bold text-black mt-2">Photography Services We Offer</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden rounded-2xl p-8 border border-border flex flex-col justify-between min-h-[320px] bg-white cursor-pointer"
              initial={{ opacity: 0, rotateY: 60 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              whileHover={{ scale: 1.06, boxShadow: '0 8px 32px 0 rgba(255,0,0,0.18)' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.10 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ perspective: 800 }}
            >
              <img
                src={feature.bgImg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 pointer-events-none"
                style={{ filter: 'brightness(0.7)' }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm border border-[#FF0000]">
                  <feature.icon className="w-6 h-6 text-[#FF0000]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-200 mb-6">{feature.description}</p>
                <Button
                  variant="outline"
                  className="rounded-full text-[#FF0000] cursor-pointer hover:bg-[#FF0000] hover:text-white bg-white font-semibold text-l px-3 py-1 shadow-lg transition-all"
                  onClick={() => navigate("/book")}
                >
                  BOOK
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
