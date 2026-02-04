import { useState } from "react";
 import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Book", to: "/book" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// Fallback LOGO_IMG for restoration
const LOGO_IMG = {
  url: "TMP PSD S.png",
  alt: "Studio Logo"
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#18181b] backdrop-blur hover:bg-background/60 text-white border-b-6 border-[#FF0000] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <a href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full  border-[#FF0000]  overflow-hidden flex items-center justify-center transition-transform duration-300 scale-390">
              <img
                src={LOGO_IMG.url}
                alt={LOGO_IMG.alt}
                className="object-contain w-full h-full"
                loading="lazy"
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png"; }}
              />
            </div>
            {/* <div className="text-xl font-bold text-teal">
              The
              <span className="block text-[10px]  text-[#FF0000]  font-normal tracking-widest text-muted-foreground">Maheshwari Picture</span>
            </div> */}
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `border-underline relative text-sm font-medium transition-colors px-6 py-1 z-10 ${isActive ? 'active text-[#FF0000]' : 'text-foreground hover:text-[#FF0000]'}`
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `relative block text-sm font-medium transition-colors px-3 py-2 z-10 ${isActive ? 'active text-[#FF0000]' : 'text-foreground hover:text-[#FF0000]'}`
                }
                end={link.to === "/"}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
