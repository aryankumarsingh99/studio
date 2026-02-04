import { motion } from 'framer-motion';

export default function FaqSection({ faqs }) {
  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#FF0000" opacity="0.1"/><path d="M12 17h.01M12 7a4 4 0 0 1 4 4c0 2-2 3-2 3h-4s-2-1-2-3a4 4 0 0 1 4-4Z" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15v.01" stroke="#FF0000" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="text-base font-semibold text-[#FF0000] tracking-wide">Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center">Answers to Your Common Queries</h2>
        </div>
        <div className="grid gap-5">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 shadow-md p-5 transition-transform hover:scale-[1.025] hover:shadow-lg flex gap-3 items-start"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex-shrink-0 mt-1">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#FF0000" opacity="0.08"/><path d="M12 17h.01M12 7a4 4 0 0 1 4 4c0 2-2 3-2 3h-4s-2-1-2-3a4 4 0 0 1 4-4Z" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15v.01" stroke="#FF0000" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{faq.question}</h3>
                <p className="text-gray-700 text-base leading-relaxed">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
