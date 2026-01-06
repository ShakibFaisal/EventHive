import React from "react";
import { Link } from "react-router";
import Logo from "./logo";
import Paragraph from "./heading/Paragraph";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 text-gray-700 pt-10 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          <div className="max-w-md">
            <Logo />
            <Paragraph className="text-sm text-gray-600 mt-4">
              Discover, create, and manage amazing events with EventHive - your
              ultimate platform for bringing people together.
            </Paragraph>

            <div className="flex gap-4 mt-8">
              <a
                href="https://x.com/"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://instagram.com/"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/siddiquesakib/EventHive"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8">
            <nav className="flex flex-col gap-3">
              <h6 className="font-bold text-gray-600 mb-2 text-[13px] uppercase tracking-wider">
                Platform
              </h6>
              <Link
                to="/events"
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Browse Events
              </Link>
              <Link
                to="/register"
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Create Event
              </Link>
              <Link
                to="/about"
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                About Us
              </Link>
            </nav>

            <nav className="flex flex-col gap-3">
              <h6 className="font-bold text-gray-600 mb-2 text-[13px] uppercase tracking-wider">
                Resources
              </h6>
              <Link
                to="/contact"
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Help Center
              </Link>
              <Link
                to="/contact"
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="#"
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                FAQ
              </a>
            </nav>

            <nav className="flex flex-col gap-3">
              <h6 className="font-bold text-gray-600 mb-2 text-[13px] uppercase tracking-wider">
                Legal
              </h6>
              <a
                href="#"
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Cookie Policy
              </a>
            </nav>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} EventHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
