import React from "react";
import { Link } from "react-router";
import { FaRocket, FaUsers, FaHandshake, FaLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-yellow-50 font-sans text-gray-900">
      
      {/* --- 1. HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          We Are <span className="text-purple-600 bg-white border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_#000]">EventHost</span>
        </h1>
        <p className="text-lg md:text-xl font-bold text-gray-600 max-w-3xl mx-auto mb-8">
          Bridging the gap between passionate organizers and enthusiastic attendees. 
          We make event management simple, fun, and accessible for everyone.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/events" 
            className="px-8 py-3 bg-black text-white font-bold text-lg border-2 border-black shadow-[4px_4px_0px_0px_#8b5cf6] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Explore Events
          </Link>
        </div>
      </div>

      {/* --- 2. STATS SECTION --- */}
      <div className="bg-white border-y-2 border-black py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-black text-blue-600">5k+</h3>
            <p className="font-bold text-gray-800">Active Users</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-black text-pink-600">120+</h3>
            <p className="font-bold text-gray-800">Events Hosted</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-black text-green-600">98%</h3>
            <p className="font-bold text-gray-800">Satisfaction</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-black text-orange-600">24/7</h3>
            <p className="font-bold text-gray-800">Support</p>
          </div>

        </div>
      </div>

      {/* --- 3. OUR STORY --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Image Side */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-400 border-2 border-black translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Team working" 
              className="relative w-full h-auto border-2 border-black grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Text Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 flex items-center gap-3">
              <span className="bg-yellow-300 border-2 border-black p-2 text-2xl">📖</span>
              Our Story
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
              EventHost started with a simple idea: <strong>Event management shouldn't be a headache.</strong> 
              We noticed that people spent more time managing spreadsheets than enjoying their events.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
              So, we built a platform that handles the boring stuff—tickets, waitlists, and payments—so you can focus on creating memories. Whether it's a small workshop or a massive concert, we've got your back.
            </p>
            
            <div className="p-4 bg-blue-100 border-2 border-black inline-block shadow-[4px_4px_0px_0px_#000]">
              <p className="font-bold italic">"We don't just host events; we build communities."</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. WHY CHOOSE US (Cards) --- */}
      <div className="bg-white py-20 border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">Why Choose Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-green-50 p-8 border-2 border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-3xl mb-6 rounded-full">
                <FaRocket className="text-green-600" />
              </div>
              <h3 className="text-2xl font-black mb-3">Fast & Easy</h3>
              <p className="font-bold text-gray-600">
                Setup your event in minutes. Our intuitive dashboard makes management a breeze for everyone.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-purple-50 p-8 border-2 border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-3xl mb-6 rounded-full">
                <FaUserShield className="text-purple-600" /> {/* Fixed Icon Usage below */}
                <FaHandshake className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-black mb-3">Trusted Community</h3>
              <p className="font-bold text-gray-600">
                We verify all organizers and provide secure payment gateways to ensure a safe experience.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-yellow-50 p-8 border-2 border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-3xl mb-6 rounded-full">
                <FaLightbulb className="text-yellow-600" />
              </div>
              <h3 className="text-2xl font-black mb-3">Innovative Tools</h3>
              <p className="font-bold text-gray-600">
                From waitlists to real-time analytics, we provide the tools you need to grow your audience.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* --- 5. CTA SECTION --- */}
      <div className="bg-black text-white py-16 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Start Your Journey?</h2>
        <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
          Join thousands of users who are creating and discovering amazing experiences every day.
        </p>
        <Link 
          to="/register" 
          className="inline-block px-8 py-4 bg-white text-black font-black text-xl border-2 border-transparent hover:bg-yellow-400 hover:border-black transition-all transform hover:scale-105"
        >
          Join EventHost Today
        </Link>
      </div>

    </div>
  );
};

export default About;