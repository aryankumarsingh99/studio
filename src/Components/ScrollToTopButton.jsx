import React from "react";

export default function ScrollToTopButton() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        className="bg-[#FF0000] hover:scale-120  text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-[#FF0000] transition-colors text-2xl"
        onClick={handleScrollTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}
