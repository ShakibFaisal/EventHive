import React, { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed! Check your email");
    // clear form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 font-sans text-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      {/* --- Header --- */}
      <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4 tracking-wide uppercase">
          Contact Support
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
          Get in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Touch
          </span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Have questions? Want to host a mega event? Or just want to say hi? We
          are all ears! Drop us a message below.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* --- LEFT SIDE: Contact Info --- */}
        <div className="space-y-8">
          <div className="prose prose-lg">
            <h2 className="text-3xl font-bold text-slate-900">
              Let's start a conversation
            </h2>
            <p className="text-slate-500">
              We're here to help and answer any question you might have. We look
              forward to hearing from you.
            </p>
          </div>

          {/* Card 1: Address */}
          <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-full text-xl flex-shrink-0">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Visit Us
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                123 Event Street, Creative Block, <br />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-xl flex-shrink-0">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Email Us
              </h3>
              <p className="text-slate-600 text-sm">support@eventhost.com</p>
            </div>
          </div>

          {/* Card 3: Phone */}
          <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-full text-xl flex-shrink-0">
              <FaPhoneAlt />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Call Us</h3>
              <p className="text-slate-600 text-sm">+880 123 456 7890</p>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: Contact Form --- */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 relative">
          <h2 className="text-2xl font-bold mb-8 text-slate-900 flex items-center gap-2">
            Send a Message
          </h2>

          <form onSubmit={handleSubscribe} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Your Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Hosting Inquiry..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                placeholder="Tell us everything..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder-slate-400 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaPaperPlane className="text-sm" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
