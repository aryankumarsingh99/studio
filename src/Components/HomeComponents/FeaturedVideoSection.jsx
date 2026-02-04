import React from "react";

const FeaturedVideoSection = () => {
  return (
    <section className="pt-4 pb-16 lg:pt-15 lg:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column: Video */}
          <div className="relative order-2 lg:order-1 flex items-center justify-center">
            <div className="w-full h-80 md:h-[420px] lg:h-[500px] rounded-2xl border-4 border-[#FF0000] overflow-hidden shadow-xl bg-black flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                src="video1.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
               
              />
            </div>
          </div>
          {/* Right column: Heading and description */}
          <div className="order-1 lg:order-2 flex flex-col items-center justify-center text-center h-full">
            <h2 className="text-4xl text-[#FF0000] lg:text-5xl xl:text-6xl font-bold leading-[0.95] tracking-tight mb-8">
              FEATURED
              <br />
              VIDEO HIGHLIGHT
            </h2>
            <div className="mb-6 flex flex-col items-center">
              <p className="text-lg text-gray-700 mb-4 max-w-xl">
                Dive into our latest featured video and experience the artistry, emotion, and storytelling that define our work. Each frame is crafted to inspire and connect.
              </p>
              <p className="text-base text-gray-500 max-w-lg">
                We believe in the power of visual stories. Our featured video showcases the passion and creativity that goes into every project we produce.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturedVideoSection;
