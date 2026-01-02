import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../Shared/heading/Heading";
import Paragraph from "../Shared/heading/Paragraph";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      title: "Discover Amazing Events",
      description:
        "Join the community of event enthusiasts and experience the best events in your city",
      buttonText: "Explore Events",
      buttonLink: "/events",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/29253467/pexels-photo-29253467.jpeg",
      title: "Host Your Own Event",
      description:
        "Bring your ideas to life and reach a wider audience with our powerful platform",
      buttonText: "Get Started",
      buttonLink: "/events",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/167478/pexels-photo-167478.jpeg",
      title: "Connect with Organizers",
      description:
        "Follow top organizers and never miss out on their latest events",
      buttonText: "Get Started",
      buttonLink: "/events",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const textVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: { y: -30, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[700px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Dot Indicator */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-3 h-3 rounded-full bg-white/80"></div>
        </motion.div>

        {/* Text Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Title */}
            <motion.div variants={textVariants} className="mb-6">
              <Heading>
                <span className="text-white">{slides[currentSlide].title}</span>
              </Heading>
            </motion.div>

            {/* Description */}
            <motion.div variants={textVariants} transition={{ delay: 0.2 }}>
              <Paragraph className="text-lg! md:text-xl! text-white/90! leading-relaxed">
                {slides[currentSlide].description}
              </Paragraph>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={textVariants}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <Link
                to={slides[currentSlide].buttonLink}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-black bg-white rounded-full hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {slides[currentSlide].buttonText}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="absolute bottom-10 left-0 w-full flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
