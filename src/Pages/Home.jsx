import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../Components/HomeComponents/HeroSection';
import FeaturedVideoSection from '../Components/HomeComponents/FeaturedVideoSection';
import AboutStudioSection from '../Components/HomeComponents/AboutStudioSection';
import EventVideosSection from '../Components/HomeComponents/EventVideosSection';
import MoodboardSection from '../Components/HomeComponents/MoodboardSection';
import Professional from '../Components/HomeComponents/Professional';
import OurAwesome from '../Components/HomeComponents/OurAwesome';
import ClientFeedback from '../Components/HomeComponents/ClientFeedback';
 
// Fallback HERO_SLIDES for restoration
const HERO_SLIDES = [
  { url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca", alt: "Hero Slide 2" },
  { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", alt: "Hero Slide 3" }
];

export default function Home() {
  const heroSlides = HERO_SLIDES;
  const [bgIndex, setBgIndex] = useState(0);
  const [animState, setAnimState] = useState('enter'); // 'enter' | 'exit'
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimState('exit');
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % heroSlides.length);
        setAnimState('enter');
      }, 400); // exit duration
    }, 2000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <HeroSection heroSlides={heroSlides} bgIndex={bgIndex} animState={animState} navigate={navigate} />
      <FeaturedVideoSection />
      <AboutStudioSection />
      <EventVideosSection />
      <MoodboardSection />
      <OurAwesome />
      <ClientFeedback />
      <Professional />
    </div>
  );
}

