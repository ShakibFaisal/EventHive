import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-base-content pt-20 pb-10 border-t border-base-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-20">
          <div className="col-span-2 lg:col-span-1">
            <div className="text-2xl font-extrabold tracking-tighter text-secondary mb-6">
              EventHive
            </div>
            <p className="text-sm text-base-content-secondary">
              The ultimate platform for discovering and managing events.
            </p>
          </div>

          <nav className="flex flex-col gap-4">
            <h6 className="font-bold text-secondary mb-2">Platform</h6>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Browse Events
            </a>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Create Event
            </a>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>
          <nav className="flex flex-col gap-4">
            <h6 className="font-bold text-secondary mb-2">Company</h6>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              About
            </a>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Blog
            </a>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Careers
            </a>
          </nav>
          <nav className="flex flex-col gap-4">
            <h6 className="font-bold text-secondary mb-2">Resources</h6>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Help Center
            </a>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Contact
            </a>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Status
            </a>
          </nav>
          <nav className="flex flex-col gap-4">
            <h6 className="font-bold text-secondary mb-2">Legal</h6>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Terms
            </a>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Privacy
            </a>
            <a className="link link-hover text-base-content-secondary hover:text-primary transition-colors">
              Cookies
            </a>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-base-200 text-sm text-base-content-secondary">
          <p>© 2026 EventHive Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a className="hover:text-primary transition-colors cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a className="hover:text-primary transition-colors cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a className="hover:text-primary transition-colors cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
