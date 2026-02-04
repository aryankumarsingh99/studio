
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3500);
  };

  return (
    <section className="py-4 lg:py-8 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#FF0000" opacity="0.1"/><path d="M4 8l8 8 8-8" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-base font-semibold text-[#FF0000] tracking-wide">Newsletter</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mt-2 text-center max-w-xs">Stay updated with the latest photography tips, studio news, and exclusive offers.</p>
        </div>
        <form
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md flex flex-col sm:flex-row gap-4 justify-center items-center"
          onSubmit={handleSubmit}
          aria-label="Subscribe to our newsletter"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className={`p-3 rounded-lg border border-gray-200 bg-gray-50 flex-1 focus:bg-white focus:border-[#FF0000] outline-none transition ${error ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            required
            autoComplete="email"
            disabled={submitted}
          />
          <button
            type="submit"
            className="py-3 px-8 rounded-full bg-[#FF0000] text-white font-bold hover:bg-red-700 transition disabled:opacity-60"
            disabled={submitted}
            aria-disabled={submitted}
          >
            {submitted ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
        <div className="h-8 mt-2 flex items-center justify-center">
          <AnimatePresence>
            {error && !submitted && (
              <motion.span
                className="text-red-600 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                role="alert"
              >
                {error}
              </motion.span>
            )}
            {submitted && (
              <motion.span
                className="text-green-600 text-base font-semibold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                role="status"
              >
                Thank you for subscribing!
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
