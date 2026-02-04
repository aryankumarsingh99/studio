import React, { useState } from 'react';
// Extended moodboard images for animation
const MOODBOARD_IMAGES = [
  { id: 1, url: "/public/image/A1.webp"  },
  { id: 2, url: "/public/image/B2.webp"  },
  { id: 3, url: "/public/image/C3.webp"  },
  { id: 4, url: "/public/image/D4.webp"  },
  { id: 5, url: "/public/image/A1.webp"  },
  { id: 6, url: "/public/image/B2.webp"  },
  { id: 7, url: "/public/image/B3.webp"  },
  { id: 8, url: "/public/image/D5.webp"  },
  { id: 9, url: "/public/image/D1.webp"  },
  { id: 10, url: "/public/image/B2.webp"  },
  { id: 11, url: "/public/image/71.webp"  },
  { id: 12, url: "/public/image/D8.webp" }
];

function MoodboardSection() {
  // Split images for two rows
  const leftToRight = MOODBOARD_IMAGES.slice(0, 4);
  const rightToLeft = MOODBOARD_IMAGES.slice(4, 8);

  // Loading state for images
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = leftToRight.length + rightToLeft.length;
  const handleImgLoad = () => setImagesLoaded((count) => count + 1);

  return (
    <section className="py-16 bg-linear-to-b from-white via-gray-100 to-white relative min-h-125">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#FF0000] mb-4 tracking-tight">Moodboard / Inspiration</h2>
          <p className="text-black text-bold text-lg max-w-2xl mx-auto mb-4">
            A curated collection of visuals, colors, and moments that inspire our creative process and set the tone for every project we take on.
          </p>
          <p className="text-gray-500 text-bold max-w-2xl mx-auto">
            Our moodboard is a living gallery of the ideas, emotions, and aesthetics that drive our work. From the golden glow of sunset to the bold contrasts of city life, each image is a spark for new stories. We believe inspiration is everywhere—sometimes in the smallest details, sometimes in the grandest scenes. Let these visuals ignite your imagination and help shape your next creative journey with us.
          </p>
        </div>
        {/* Loading Spinner */}
        {imagesLoaded < totalImages && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-20">
            <div className="w-16 h-16 border-4 border-[#FF0000] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {/* Animated Rows */}
        <div className={`space-y-8 transition-opacity duration-500 ${imagesLoaded < totalImages ? 'opacity-0' : 'opacity-100'}`}>
          {/* Row 1: Left to Right */}
          <div className="overflow-hidden">
            <div className="flex w-max animate-move-ltr gap-8">
              {leftToRight.map(img => (
                <div key={img.id} className="rounded-2xl overflow-hidden shadow-lg group relative min-w-65">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onLoad={handleImgLoad}
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png'; handleImgLoad(); }}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2: Right to Left */}
          <div className="overflow-hidden">
            <div className="flex w-max animate-move-rtl gap-8">
              {rightToLeft.map(img => (
                <div key={img.id} className="rounded-2xl overflow-hidden shadow-lg group relative min-w-65">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onLoad={handleImgLoad}
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png'; handleImgLoad(); }}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Animation Keyframes */}
        <style>{`
          @keyframes move-ltr {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes move-rtl {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-move-ltr {
            animation: move-ltr 18s linear infinite;
          }
          .animate-move-rtl {
            animation: move-rtl 18s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}

export default MoodboardSection;
