// Fallback CLIENT_FEEDBACK_IMG for restoration
const CLIENT_FEEDBACK_IMG = {
  url: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  alt: "Client Feedback Portrait"
};

const ClientFeedback: React.FC = () => {
  return (
    <div
      className="bg-cover bg-center pb-4 pt-20 relative overflow-hidden"
      style={{}}
    >
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-5xl font-bold tracking-wider text-white">
            [ CLIENT <span className="text-[#FF0000]">FEEDBACK</span> ]
          </h2>
          <p className="text-black font-bold text-lg max-w-3xl mx-auto leading-relaxed mt-4">
            There are many variations of passages of Lorem Ipsum available,
            but the majority have suffered alteration in some form, by
            injected humour, or randomised words which don't look even
            slightly believable.
          </p>
        </div>



        {/* Carousel Container */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button className="absolute left-0 z-10 text-black text-4xl hover:text-[#FF0000] transition-colors p-2">
            ‹
          </button>

          {/* Feedback Card */}
          <div className="grid grid-cols-2 gap-12 items-center max-w-5xl w-full bg-opacity-50 p-12">
            {/* Client Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 border-4 border-[#FF0000] transform translate-x-4 translate-y-4"></div>
                <img
                  src={CLIENT_FEEDBACK_IMG.url}
                  alt={CLIENT_FEEDBACK_IMG.alt}
                  className="w-full h-full object-cover relative z-10"
                  loading="lazy"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png"; }}
                />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="text-black">
              <h3 className="text-4xl font-bold text-black mb-2">
                MARIA LEBOWSKII
              </h3>
              <p className="text-[#FF0000] text-lg mb-6">Portfolio.com</p>

              <p className="text-black font-bold text-base leading-relaxed mb-8">
                "The photography team exceeded my expectations! Every shot was creative, beautifully composed, and full of emotion. I highly recommend their services for anyone looking to capture life's best moments."
              </p>

              {/* Star Rating */}
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-600 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button className="absolute right-0 z-10 text-black text-4xl hover:text-[#FF0000] transition-colors p-4">
            ›
          </button>
        </div>

      </div>
    </div>
  )
}

export default ClientFeedback;