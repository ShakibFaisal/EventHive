import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-12 mt-13 px-6 font-sans text-gray-900">
      {/* --- Header --- */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase">
          Get in{" "}
          <span className="text-white bg-black px-4 py-1 transform -skew-x-6 inline-block">
            Touch
          </span>
        </h1>
        <p className="text-lg font-bold text-gray-600">
          Have questions? Want to host a mega event? Or just want to say hi?{" "}
          <br />
          We are all ears! Drop us a message below.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* --- LEFT SIDE: Contact Info --- */}
        <div className="space-y-8">
          {/* Card 1: Address */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-300 border-2 border-black flex items-center justify-center rounded-full text-xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-xl font-black">Visit Us</h3>
                <p className="font-medium text-gray-600">
                  123 Event Street, Creative Block, <br />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-300 border-2 border-black flex items-center justify-center rounded-full text-xl">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="text-xl font-black">Email Us</h3>
                <p className="font-medium text-gray-600">
                  support@eventhost.com
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Phone */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-300 border-2 border-black flex items-center justify-center rounded-full text-xl">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="text-xl font-black">Call Us</h3>
                <p className="font-medium text-gray-600">+880 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: Contact Form --- */}
        <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            Send a Message <FaPaperPlane className="text-pink-500" />
          </h2>

          <form className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block font-bold mb-1 text-sm">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block font-bold mb-1 text-sm">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="block font-bold mb-1 text-sm">Subject</label>
              <input
                type="text"
                placeholder="Hosting Inquiry..."
                className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block font-bold mb-1 text-sm">
                Your Message
              </label>
              <textarea
                rows="4"
                placeholder="Tell us everything..."
                className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full py-4 bg-black text-white font-black text-lg border-2 border-black hover:bg-yellow-400 hover:text-black transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
