import React from "react";

const Newsletter = () => {
  return (
    <div>
      {/* Newsletter Section */}
      <div className="bg-base-100/50 rounded-[2.5rem] p-12 mb-20 flex flex-col lg:flex-row items-center justify-between gap-10 border border-base-300">
        <div className="max-w-lg">
          <h3 className="text-3xl font-bold tracking-tight mb-4">
            Stay updated
          </h3>
          <p className="text-base-content-secondary text-lg">
            Subscribe to our newsletter for the latest event news, tips, and
            exclusive offers.
          </p>
        </div>
        <div className="w-full max-w-md">
          <div className="join w-full">
            <input
              className="input input-lg join-item w-full bg-white border-base-300 focus:outline-none focus:border-primary rounded-l-full pl-8"
              placeholder="Enter your email"
            />
            <button className="btn btn-lg btn-secondary join-item rounded-r-full px-8 font-bold hover:bg-primary hover:text-secondary hover:border-primary">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
