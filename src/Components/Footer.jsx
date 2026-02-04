import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
 
// Fallback LOGO_IMG for restoration
const LOGO_IMG = {
  url: "TMP PSD S.png",
  alt: "Studio Logo"
};

export default function Footer() {
  return (
    <footer className="bg-background bg-[#18181b] text-white border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between">
          {/* Logo and description */}
          <div className="md:w-1/2">
            <div className="inline-block mb-4">
              <img
                src={LOGO_IMG.url}
                alt={LOGO_IMG.alt}
                className="h-20 w-28 mb-2 object-contain scale-260"
                loading="lazy"
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png"; }}
              />
              <p className="text-base text-left text-white max-w-md mt-2">
Every photograph tells a story. Our journey began with a simple camera and a passion for capturing life's most beautiful moments. Over the years, we've transformed that passion into a creative studio, blending artistry and technology to deliver images that inspire, celebrate, and preserve memories for generations.               </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-teal hover:text-white transition-colors text-foreground">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-teal hover:text-white transition-colors text-foreground">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-teal hover:text-white transition-colors text-foreground">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
          {/* Links columns */}
          <div className="md:w-1/2 flex flex-col md:flex-row gap-12 justify-end">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-[#eb0909] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-base hover:text-[#eb0909] text-white">Home</a></li>
                <li><a href="#" className="text-base hover:text-[#eb0909] text-white">Core Services</a></li>
                <li><a href="#" className="text-base hover:text-[#eb0909] text-white">Capabilities</a></li>
                <li><a href="#" className="text-base hover:text-[#eb0909] text-white">Contact Us</a></li>
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className="font-semibold text-[#eb0909] mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-white">
                  <Mail className="h-5 w-5" />
                  <a href="mailto:contactswiftrise@gmail.com" className=" hover:text-[#eb0909] text-white">contactswiftrise@gmail.com</a>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Phone className="h-5 w-5" />
                  <a href="tel:+917008796745" className="text-white hover:text-[#eb0909]">+91 70087 96745</a>
                </li>
                <li className="flex items-center gap-2 hover:text-[#eb0909]  text-white">
                  <MapPin className="h-5 w-5" />
                  <span>33/11, Star House, Lane-4, Bhagabat Sandhan Colony, Rasulgarh, Bhubaneswar, Odisha – 751010</span>
                </li>
              </ul>
            </div>
            {/* Let's Talk */}
            <div>
              <h4 className="font-semibold text-[#eb0909] mb-4">Let’s Talk</h4>
              <p className="text-white hover:text-[#eb0909] mb-2">Have questions or ideas? Write to us — we usually respond within hours.</p>
              <a href="mailto:contactswiftrise@gmail.com" className="text-white font-semibold hover:text-[#eb0909] block mb-4">contactswiftrise@gmail.com</a>
              <div className="flex items-center gap-4 mt-2">
                <Facebook className="w-6 h-6 cursor-pointer hover:text-[#eb0909]" />
                <Instagram className="w-6 h-6 cursor-pointer hover:text-[#eb0909]" />
                <Twitter className="w-6 h-6 cursor-pointer hover:text-[#eb0909]" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm hover:text-[#eb0909] text-muted-foreground">
           © 2026 Swiftrise pvt ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground text-[#eb0909] hover:text-teal">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground text-[#eb0909] hover:text-teal">Term of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
