"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../Components/ServicesComponents/HeroSection";
 import VideoSection from "../Components/ServicesComponents/VideoSection";
import FeaturedVideoSection from "../Components/ServicesComponents/FeaturedVideoSection";
import FeaturesSection from "../Components/ServicesComponents/FeaturesSection";
import ResourcesSection from "../Components/ServicesComponents/ResourcesSection";
import TeamSection from "../Components/ServicesComponents/TeamSection";
import FaqSection from "../Components/ServicesComponents/FaqSection";
import ContactSection from "../Components/ServicesComponents/ContactSection";
import NewsletterSection from "../Components/ServicesComponents/NewsletterSection";
import { Wallet, Shield, CreditCard, Headphones, Plus, ArrowUpRight } from "lucide-react";
// Hero slider images for photography studio
const heroImages = [
  " https://images.unsplash.com/photo-1676836868526-ec85d34e30b2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Wedding
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Portrait
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Event
 
];

// Features, team, FAQ, and resources data (copied from previous context)
const features = [
  {
    icon: Wallet,
    title: "Wedding Photography",
    description: "Capture your special day with our creative and professional wedding photography packages.",
    light: true,
    bgImg: "https://cdn0.weddingwire.in/article/3577/3_2/960/jpg/77753-day-wedding-the-wedding-story-lead-image.jpeg",
  },
  {
    icon: Shield,
    title: "Portrait Sessions",
    description: "Personal, family, and corporate portraits in our state-of-the-art studio or on location for your needs.",
    light: false,
    bgImg: "https://images.unsplash.com/photo-1581977325979-80749e97b0c7?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: CreditCard,
    title: "Event Coverage",
    description: "From birthdays to corporate events, we document your moments with style and clarity.",
    light: true,
    bgImg: "https://images.unsplash.com/photo-1761644671193-c2ee184a2f63?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: Headphones,
    title: "Studio Rental",
    description: "Rent our fully equipped studio for your own creative projects, with lighting and props included.",
    light: false,
    bgImg: "https://images.unsplash.com/photo-1685474717250-b23175a5faed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: Wallet,
    title: "Product Photography",
    description: "Showcase your products with crisp, high-quality images perfect for catalogs, e-commerce, and advertising.",
    light: true,
    bgImg: " https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?q=80&w=1018&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: CreditCard,
    title: "Commercial Shoots",
    description: "Professional photography for advertising, branding, and business campaigns.",
    light: false,
    bgImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Shield,
    title: "Family Portraits",
    description: "Create lasting memories with beautiful family and group portraits.",
    light: true,
    bgImg: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Headphones,
    title: "Fashion Photography",
    description: "Modern fashion shoots with creative direction and professional lighting.",
    light: false,
    bgImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Shield,
    title: "Photo Editing & Retouching",
    description: "Professional editing and retouching to make every photo look its absolute best for your needs.",
    light: false,
    bgImg: "https://images.unsplash.com/photo-1722290726938-734e9bc45b48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const teamImages = [
  { src: "https://images.unsplash.com/photo-1576948609578-22c3fc222196?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Photographer at work" },
  { src: "https://images.unsplash.com/photo-1615397085170-f2937614f4f2?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Studio team" },
  { src: "https://images.unsplash.com/photo-1610845914026-80769f5d2dbd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Editing team" },
  { src: "https://images.unsplash.com/photo-1543242594-b5803d0a9cc1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Lighting specialist" },
];
const faqItems = [
  { question: "What types of photography do you offer?", answer: "We specialize in weddings, portraits, events, product, and commercial photography." },
  { question: "How do I book a session?", answer: "You can book online, call us, or visit our studio to schedule your session." },
  { question: "Do you provide photo editing?", answer: "Yes, all our packages include professional photo editing and retouching." },
  { question: "Can I rent your studio?", answer: "Absolutely! Our studio is available for rent with full access to lighting and props." },
  { question: "How soon will I receive my photos?", answer: "Turnaround time is typically 7-10 business days, depending on the package." },
];
const resources = [
  { title: "How to Prepare for Your Photoshoot", image: "https://images.unsplash.com/photo-1650421120432-178ec62cd849?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Studio Lighting Tips", image: "https://images.unsplash.com/photo-1767130298927-2df12c33e5d6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Posing Guide for Clients", image: "https://images.unsplash.com/photo-1647709778373-ad8ba97a8690?q=80&w=728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

function Services() {
  const navigate = useNavigate();
  const [heroIdx, setHeroIdx] = useState(0);
  const heroRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    // Scroll to hero section on mount
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div ref={heroRef}>
        <HeroSection heroImages={heroImages} heroIdx={heroIdx} onViewServices={() => {
          const el = document.getElementById('photography-services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />
      </div>
      <VideoSection />
      <FeaturedVideoSection />
      {/* Stack FeaturesSection and ResourcesSection with absolutely no spacing */}
      <div className="max-w-7xl mx-auto">
        <FeaturesSection features={features} navigate={navigate} Button={({ children, ...props }) => <button {...props}>{children}</button>} />
        <ResourcesSection resources={resources} Plus={Plus} ArrowUpRight={ArrowUpRight} />
      </div>
      <TeamSection team={teamImages.map(img => ({ image: img.src, name: img.alt, role: "Photographer", bio: "" }))} />

      {/* Two-column layout for FAQ and Contact (wider) */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 ">
            <FaqSection faqs={faqItems} />
          </div>
          <div className="flex-1 flex justify-center items-start">
            <div className="w-full max-w-md">
              <ContactSection />
            </div>
          </div>
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
}

export default Services;