import ShowcaseSection from "./ShowcaseSection";
 
export default function HeroSection({ heroImages, heroIdx, onViewServices }) {
  return (
    <section className="relative py-16 lg:py-24 min-h-[80vh] lg:min-h-[90vh] overflow-hidden">
      <img
        src={heroImages[heroIdx]}
        alt="Studio hero background"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-all"
        style={{ objectFit: 'cover', opacity: 8.3 }}
        loading="lazy"
       />
     
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img src="/assets/img_28.webp" alt="Photographer" width={48} height={48} className="object-cover w-full h-full" loading="lazy" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white text-balance">
              Capture Life's Best Moments<br />With StudioX Photography
            </h1>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img src="/assets/img_29.jpg" alt="Studio team" width={48} height={48} className="object-cover w-full h-full" loading="lazy" />
            </div>
          </div>
          {/* Three Cards Overlay */}
            <div className="mb-8">
              <ShowcaseSection />
            </div>
          <p className="text-white/90 mb-8 font-bold max-w-xl mx-auto">
            From weddings to portraits, our passionate team of photographers and artists are here to turn your memories into timeless art. Book your session or explore our creative studio services today!
          </p>
          <button
            className="bg-white hover:bg-[#d90000] hover:scale-110 cursor-pointer hover:text-white text-[#FF0000] font-bold rounded-full px-8 py-3"
            onClick={onViewServices}
          >
            View Our Services
          </button>
        </div>
      </div>
    </section>
  );
}
