import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
 

export default function AboutStudioSection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef();
  const rightColRef = useRef();
  const statRef1 = useRef();
  const statRef2 = useRef();
  const statRef3 = useRef();
  const [startCount, setStartCount] = useState(false);
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    let triggered = false;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setStartCount(true);
          triggered = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (leftColRef.current) {
      gsap.fromTo(
        leftColRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
    if (rightColRef.current) {
      gsap.fromTo(
        rightColRef.current,
        { y: 80, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
    [statRef1, statRef2, statRef3].forEach((ref, i) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            delay: 0.2 + i * 0.18,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!startCount) return;
    const yearsTarget = 7;
    const projectsTarget = 500;
    const clientsTarget = 3000;
    const duration = 10000; // ms
    const start = performance.now();
    function animate(now) {
      const elapsed = Math.min(now - start, duration);
      setYears(Math.round(yearsTarget * (elapsed / duration)));
      setProjects(Math.round(projectsTarget * (elapsed / duration)));
      setClients(Math.round(clientsTarget * (elapsed / duration)));
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        setYears(yearsTarget);
        setProjects(projectsTarget);
        setClients(clientsTarget);
      }
    }
    requestAnimationFrame(animate);
  }, [startCount]);

  return (
    <section ref={sectionRef} className="pt-4 pb-16 lg:pt-6 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div ref={leftColRef}>
            <h2 className="text-4xl text-[#FF0000]  lg:text-5xl xl:text-6xl font-bold text-foreground leading-[0.95] tracking-tight mb-8">
              ABOUT OUR
              <br />
              PHOTOGRAPHY STUDIO
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <p className="text-l text-muted-foreground mb-2 max-w-35">
                  Our studio is dedicated to capturing your best moments with creativity and care.
                </p>
              </div>
              <div>
                <p ref={statRef1} className="text-4xl lg:text-5xl font-bold text-[#FF0000] text-foreground">{years}+</p>
                <p className="text-xs text-muted-foreground">Years of Studio Excellence</p>
              </div>
              <div>
                <p ref={statRef2} className="text-4xl lg:text-5xl font-bold text-[#FF0000] text-foreground">{projects}+</p>
                <p className="text-xs text-muted-foreground">Studio Projects</p>
              </div>
              <div>
                <p className="text-l text-muted-foreground mb-2 max-w-35">
                  We blend technical skill with artistic vision for every client.
                </p>
              </div>
              <div>
                <p className="text-l text-muted-foreground mb-2 max-w-35">
                  Trusted by individuals and brands for studio photography.
                </p>
              </div>
              <div>
                <p ref={statRef3} className="text-4xl lg:text-5xl text-[#FF0000] font-bold text-foreground">{clients >= 1000 ? `${Math.round(clients/100)/10}K+` : `${clients}+`}</p>
                <p className="text-xs text-muted-foreground">Happy Studio Clients</p>
              </div>
            </div>
          </div>
          <div className="relative" ref={rightColRef}>
            <div className="aspect-5/5 rounded-2xl border-4 border-[#FF0000]  overflow-hidden">
              <video
                src="video2.mp4"
                className="object-cover "
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                onError={e => { e.currentTarget.poster = "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/no-image-placeholder.png"; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
