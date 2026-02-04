export default function ShowcaseSection() {
  return (
    <section className="relative py-0">
      <div className="grid grid-cols-1 lg:grid-cols-3   gap-6 items-center">
        <div className="hidden hover:scale-110 lg:block">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
            <img src="/assets/img_32.webp" alt="Studio setup" className="object-cover w-full h-full absolute inset-0" loading="lazy" />
          </div>
        </div>
        <div className="rounded-2xl hover:scale-110 overflow-hidden shadow-lg flex items-center justify-center bg-white h-64">
          <img
            src="/assets/img_31.webp"
            alt="Recent Bookings Showcase"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="hidden hover:scale-110 lg:block">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
            <img src="/assets/img_30.webp" alt="Happy clients" className="object-cover w-full h-full absolute inset-0" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
