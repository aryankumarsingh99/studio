// Fallback PROFESSIONAL_ALBUM_IMAGES array for restoration
const PROFESSIONAL_ALBUM_IMAGES = [
  { url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308", alt: "Professional Album 1" },
  { url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca", alt: "Professional Album 2" },
  { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", alt: "Professional Album 3" }
];

import { useNavigate } from 'react-router-dom';
 
export default function Professional() {
  const navigate = useNavigate();

  return (
    <section
        className="pt-4 pb-20 relative mb-20 overflow-hidden"
      >
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1768695089167-293dd344cc87?q=80&w=1240&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}
        />
        <div className="relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6 md:px-12">
            {/* Left: Album Collage */}
            <div className="shrink-0 w-full md:w-1/2 flex justify-center">
              <div className="relative group grid grid-cols-2 gap-4">
                <div className="col-span-2 relative">
                  <img
                    src={PROFESSIONAL_ALBUM_IMAGES[0].url}
                    alt={PROFESSIONAL_ALBUM_IMAGES[0].alt}
                    className="w-full h-48 object-cover rounded-2xl shadow-2xl border-4 border-[#ffffff] group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png"; }}
                  />
                  <button
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FF0000] text-white text-base font-bold px-8 py-2 rounded-full shadow-lg tracking-widest uppercase focus:outline-none hover:bg-white hover:text-[#FF0000] transition-colors"
                    onClick={() => {
                      navigate('/services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    Album
                  </button>
                </div>
                <img
                  src={PROFESSIONAL_ALBUM_IMAGES[1].url}
                  alt={PROFESSIONAL_ALBUM_IMAGES[1].alt}
                  className="w-full h-32 object-cover rounded-xl shadow-lg border-2 border-white"
                  loading="lazy"
                  onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png"; }}
                />
                <img
                  src={PROFESSIONAL_ALBUM_IMAGES[2].url}
                  alt={PROFESSIONAL_ALBUM_IMAGES[2].alt}
                  className="w-full h-32 object-cover rounded-xl shadow-lg border-2 border-white"
                  loading="lazy"
                  onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png"; }}
                />
              </div>
            </div>
            {/* Right: Text Content */}
            <div className="w-full md:w-1/2 text-left md:text-left flex flex-col justify-center items-start">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight font-serif italic drop-shadow-lg" style={{ fontFamily: 'Merriweather, serif' }}>
                Professional Closure
              </h2>
              <p className="text-white font-medium text-lg mb-6 leading-relaxed">
                Thank you for exploring our creative world. We are committed to delivering excellence in every frame and every story.<br className="hidden md:block" />
                Connect with us for your next project and experience the difference of true professionalism.
              </p>
               <button
                  className="relative font-bold px-12 py-4 rounded-full hover:scale-110 cursor-pointer border-2 bg-white border-[#FF0000] text-[#FF0000] bg-transparent uppercase tracking-widest overflow-hidden transition-all duration-300 group shadow-md hover:bg-[#FF0000] hover:text-white hover:shadow-xl"
                  onClick={() => navigate('/contact')}
                >
                   <span className="relative z-10">Contact Us</span>
                </button>
            </div>
          </div>
        </div>
      </section>
  )
}