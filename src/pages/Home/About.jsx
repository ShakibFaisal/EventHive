import React from "react";
import { Link } from "react-router"; // Ensure this matches your router version (react-router-dom usually)
import { FaRocket, FaUsers, FaHandshake, FaLightbulb, FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* --- 1. HERO SECTION --- */}
      <div className="relative overflow-hidden bg-white pt-20 pb-24 md:pt-32 md:pb-40">
        {/* Background Decorative Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-70 -z-10"></div>
        
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 tracking-wide uppercase">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-slate-900">
            We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">EventHost</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bridging the gap between passionate organizers and enthusiastic
            attendees. We make event management simple, scalable, and accessible for everyone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/events"
              className="px-8 py-3.5 rounded-full bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300"
            >
              Explore Events
            </Link>
            <button className="px-8 py-3.5 rounded-full bg-white text-slate-700 font-semibold border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* --- 2. STATS SECTION (Floating Card) --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
          
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">5k+</h3>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Users</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">120+</h3>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Events Hosted</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">98%</h3>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Satisfaction</p>
          </div>

          <div className="space-y-1 border-none">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">24/7</h3>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Support</p>
          </div>
        </div>
      </div>

      {/* --- 3. OUR STORY --- */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            {/* Decoration */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-100 rounded-full -z-10"></div>
            
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Team working"
              className="w-full h-auto rounded-3xl shadow-2xl shadow-indigo-900/10 object-cover"
            />
          </div>

          {/* Text Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-snug">
              Simplifying how the world <br />
              <span className="text-indigo-600">comes together.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              EventHost started with a simple idea: <strong>Event management shouldn't be a headache.</strong> We noticed that people spent more time managing spreadsheets than enjoying their events.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              So, we built a platform that handles the boring stuff—tickets, waitlists, and payments—so you can focus on creating memories.
            </p>

            <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <FaCheckCircle className="text-indigo-500" /> Community Focused
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <FaCheckCircle className="text-indigo-500" /> Secure Payments
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <FaCheckCircle className="text-indigo-500" /> Real-time Analytics
                </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- 4. WHY CHOOSE US (Cards) --- */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose EventHost?
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
                Everything you need to manage your events without the technical hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <FaRocket className="text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fast & Easy</h3>
              <p className="text-slate-600 leading-relaxed">
                Setup your event in minutes. Our intuitive dashboard makes
                management a breeze for everyone.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                <FaHandshake className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Trusted Community</h3>
              <p className="text-slate-600 leading-relaxed">
                We verify all organizers and provide secure payment gateways to
                ensure a safe experience.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                <FaLightbulb className="text-orange-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Innovative Tools</h3>
              <p className="text-slate-600 leading-relaxed">
                From waitlists to real-time analytics, we provide the tools you
                need to grow your audience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 5. CTA SECTION --- */}
      <div className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-3xl px-6 py-16 md:px-12 md:py-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/40">
           {/* Decor Circles */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-900 opacity-20 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Ready to Start Your Journey?
          </h2>
          <p className="text-indigo-100 mb-10 text-lg max-w-2xl mx-auto relative z-10">
            Join thousands of users who are creating and discovering amazing
            experiences every day.
          </p>
          <Link
            to="/register"
            className="relative z-10 inline-block px-10 py-4 bg-white text-indigo-600 font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Join EventHost Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;