export default function ContactSection() {
  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#FF0000" opacity="0.1"/><path d="M16 8a6 6 0 0 1-8 0" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" stroke="#FF0000" strokeWidth="1.5"/></svg>
            <span className="text-base font-semibold text-[#FF0000] tracking-wide">Contact Us</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center">Get in Touch</h2>
          <p className="text-gray-600 mt-2 text-center max-w-xs">Have questions or want to book a session? Fill out the form below and our team will get back to you soon.</p>
        </div>
        <form className="bg-white rounded-xl p-6 border border-gray-200 shadow-md space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF0000] outline-none transition" required />
            <input type="email" placeholder="Email" className="p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF0000] outline-none transition" required />
          </div>
          <textarea placeholder="Your Message" className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF0000] outline-none transition" rows={4} required />
          <button type="submit" className="w-full py-3 rounded-full bg-[#FF0000] text-white font-bold hover:bg-red-700 transition">Send Message</button>
        </form>
      </div>
    </section>
  );
}
