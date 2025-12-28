import React, { useState, useEffect } from "react";
import { Link } from "react-router"; // Check if you use 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
      title: "Discover Amazing Events",
      description: "Join the community of event enthusiasts and experience the best events in your city.",
      buttonText: "Explore Events",
      buttonLink: "/events",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
      title: "Host Your Own Event",
      description: "Bring your ideas to life and reach a wider audience with our platform.",
      buttonText: "Get Started",
      buttonLink: "/register",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
      title: "Connect with Organizers",
      description: "Follow top organizers and never miss out on their latest events.",
      buttonText: "See Organizers",
      buttonLink: "/organizers",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 6000); // 6 Seconds for better readability
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Animation Variants
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full bg-slate-50 pt-24 pb-16 md:pt-32 md:pb-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- 1. Text Section (Fixed Height Container to prevent layout shift) --- */}
        <div className="relative w-full min-h-[280px] md:min-h-[220px] flex items-center justify-center text-center mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h1 
                variants={textVariants} 
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p 
                variants={textVariants}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                variants={textVariants}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to={slides[currentSlide].buttonLink}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-1"
                >
                  {slides[currentSlide].buttonText}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- 2. Image Section --- */}
        <div className="relative w-full">
            {/* Aspect Ratio Container: Mobile (4/3), Desktop (21/9) */}
            <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 group">
                
                <AnimatePresence mode="wait">
                    <motion.img
                    key={currentSlide}
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Dark Gradient Overlay for better contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

                {/* Navigation Buttons (Visible on Hover/Always on Mobile) */}
                <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={prevSlide}
                        className="p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                    >
                        <FaArrowLeft size={18} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                    >
                        <FaArrowRight size={18} />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2 z-20">
                    {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-white/40 w-2 hover:bg-white/60"
                        }`}
                    ></button>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSlider;