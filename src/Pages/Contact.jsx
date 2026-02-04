import React from "react";
import { motion } from "framer-motion";

function ContactHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center py-20 px-4 bg-gradient-to-br from-[#18181b] via-[#232323] to-[#2d2d2d] overflow-hidden">
      {/* Layered gradients and pattern */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <svg width="100%" height="100%" className="w-full h-full opacity-10" style={{position:'absolute',top:0,left:0}}>
          <defs>
            <pattern id="dots-contact" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#FF0000" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-contact)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0000]/10 via-transparent to-[#232323]/30" />
      </div>
      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
        {/* Left: Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 60 }}
          viewport={{ once: true, amount: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-14 flex-1 min-w-[270px] max-w-xl border-l-8 border-[#FF0000]"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-[#FF0000] mb-4 drop-shadow-lg">
            <span className="block text-white text-2xl md:text-3xl font-serif mb-2 tracking-normal">Let's Connect</span>
            <span className="block italic text-[#FF0000] text-5xl md:text-6xl mb-2 font-serif">Contact Us</span>
          </h1>
          <p className="text-lg text-gray-200 mb-6 font-light max-w-md">
            Reach out for bookings, questions, or just to say hello. Our team is always ready to help you create something amazing.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <span className="px-4 py-2 rounded-full bg-[#FF0000] text-white font-bold shadow-lg text-sm md:text-base">info@yourstudio.com</span>
            <span className="px-4 py-2 rounded-full border-2 border-[#FF0000] text-[#FF0000] font-bold bg-transparent text-sm md:text-base">+1 234 567 8901</span>
          </div>
        </motion.div>
        {/* Right: Large Accent Icon with Animated Ring */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex items-center justify-center relative min-w-[220px]"
        >
          <div className="rounded-full bg-[#FF0000] bg-opacity-20 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center shadow-2xl border-4 border-[#FF0000]">
            {/* Modern-classic location pin with heart SVG */}
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="45" r="38" stroke="#FF0000" strokeWidth="7" fill="none" />
              <g>
                <path d="M45 28c-8 0-14 6-14 14 0 8.5 10.5 20.5 13.1 23.2a2 2 0 0 0 2.8 0C48.5 62.5 59 50.5 59 42c0-8-6-14-14-14z" fill="#FF0000" fillOpacity="0.13" stroke="#FF0000" strokeWidth="2.5" />
                <circle cx="45" cy="42" r="5" fill="#FF0000" />
                <path d="M45 44.5c-2.5-2-5-3.5-5-6a3 3 0 0 1 6 0 3 3 0 0 1 6 0c0 2.5-2.5 4-5 6z" fill="#fff" fillOpacity="0.8" />
              </g>
            </svg>
          </div>
          {/* Animated Accent Ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: [0.8, 1.1, 0.95, 1], opacity: [0.5, 0.7, 0.5, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 md:w-80 md:h-80 border-4 border-dashed border-[#FF0000] rounded-full z-0"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}

function ContactDetails() {
  return (
    <section className="py-20 px-4 bg-[#232323] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 60 }}
          viewport={{ once: false, amount: 0.3 }}
          className="bg-[#18181b] border-l-8 border-[#FF0000] rounded-2xl shadow-2xl p-8 flex flex-col justify-center"
        >
          <div className="text-xl md:text-2xl font-bold mb-2 text-[#FF0000] font-serif tracking-wide">Contact Info</div>
          <div className="text-gray-200 text-base md:text-lg font-serif mb-2">Email: <span className="text-white">info@yourstudio.com</span></div>
          <div className="text-gray-200 text-base md:text-lg font-serif mb-2">Phone: <span className="text-white">+1 234 567 8901</span></div>
          <div className="text-gray-200 text-base md:text-lg font-serif">Address: <span className="text-white">123 Studio Lane, City, Country</span></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 60, delay: 0.18 }}
          viewport={{ once: false, amount: 0.3 }}
          className="bg-[#232323] border-2 border-dashed border-[#FF0000] rounded-2xl shadow-lg p-8 text-center"
        >
          <div className="text-xl md:text-2xl font-bold mb-2 text-[#FF0000] font-serif tracking-wide">Business Hours</div>
          <div className="text-gray-200 text-base md:text-lg font-serif mb-2">Mon - Fri: 9:00 AM - 7:00 PM</div>
          <div className="text-gray-200 text-base md:text-lg font-serif mb-2">Sat: 10:00 AM - 5:00 PM</div>
          <div className="text-gray-200 text-base md:text-lg font-serif">Sun: Closed</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 60, delay: 0.36 }}
          viewport={{ once: false, amount: 0.3 }}
          className="bg-[#18181b] border-r-8 border-[#FF0000] rounded-2xl shadow-2xl p-8 flex flex-col justify-center"
        >
          <div className="text-xl md:text-2xl font-bold mb-2 text-[#FF0000] font-serif tracking-wide">Follow Us</div>
          <div className="text-gray-200 text-base md:text-lg font-serif mb-2">Instagram: <span className="text-white">@yourstudio</span></div>
          <div className="text-gray-200 text-base md:text-lg font-serif mb-2">Facebook: <span className="text-white">/yourstudio</span></div>
          <div className="text-gray-200 text-base md:text-lg font-serif">Twitter: <span className="text-white">@yourstudio</span></div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#232323] to-[#18181b] text-white">
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
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-[#FF0000] tracking-wider">Why Contact Us?</h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-200 font-serif">
            <li>Personalized support for every inquiry</li>
            <li>Quick response from our friendly team</li>
            <li>Book sessions, ask questions, or share feedback</li>
            <li>We value your privacy and satisfaction</li>
          </ul>
        </motion.div>
        {/* Modern Middle Card: Contact Form */}
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
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#FF0000" strokeWidth="3" fill="none" /><text x="50%" y="60%" textAnchor="middle" fill="#FF0000" fontSize="14" fontFamily="serif" fontWeight="bold">✉</text></svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF0000]">Contact Form</h3>
            <form className="w-full max-w-xs space-y-4">
              <div>
                <input id="name" name="name" type="text" required placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-[#232323] border-2 border-[#FF0000] text-white focus:outline-none focus:border-white transition" />
              </div>
              <div>
                <input id="email" name="email" type="email" required placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-[#232323] border-2 border-[#FF0000] text-white focus:outline-none focus:border-white transition" />
              </div>
              <div>
                <textarea id="message" name="message" rows={4} required placeholder="Message" className="w-full px-4 py-3 rounded-lg bg-[#232323] border-2 border-[#FF0000] text-white focus:outline-none focus:border-white transition resize-none" />
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-full bg-[#FF0000] text-white font-bold text-lg shadow-lg hover:bg-[#d10000] transition font-serif"
              >
                Send Message
              </motion.button>
            </form>
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
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#FF0000" strokeWidth="3" fill="none" /><text x="50%" y="60%" textAnchor="middle" fill="#FF0000" fontSize="14" fontFamily="serif" fontWeight="bold">★</text></svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF0000]">Our Promise</h3>
            <p className="text-lg text-gray-200 mb-4 text-center">We promise to respond quickly, respect your privacy, and help you with any creative or business need.</p>
            <ul className="list-none space-y-2 text-gray-300 text-center">
              <li><span className="font-semibold text-white">Support:</span> Friendly, responsive, and always here for you</li>
              <li><span className="font-semibold text-white">Guarantee:</span> 100% satisfaction with every interaction</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactMap() {
  return (
    <section className="py-20 px-4 bg-[#18181b] flex flex-col items-center">
      <div className="max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FF0000]">
        <iframe
          title="Studio Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153169!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2s123%20Studio%20Lane!5e0!3m2!1sen!2sus!4v1660000000000!5m2!1sen!2sus"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <main className="bg-[#18181b] min-h-screen">
      <ContactHero />
      <ContactDetails />
      <ContactFormSection />
      <ContactMap />
    </main>
  );
}
