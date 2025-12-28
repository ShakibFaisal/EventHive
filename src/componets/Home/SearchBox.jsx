import React from "react";

const SearchBox = () => {
  return (
    <div className="bg-base-200 pb-16 px-4">
      <div className="max-w-5xl mx-auto bg-white p-4 md:p-6 rounded-[2rem] shadow-2xl -mt-24 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Event Name Input */}
          <div className="form-control w-full md:w-[38%]">
            <label className="label pl-2 pb-1">
              <span className="label-text font-semibold text-gray-500 text-xs tracking-wider uppercase">
                Looking For
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Concert, Festival, Workshop..."
                className="input w-full pl-11 bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:outline-none focus:ring-0 rounded-2xl h-14 text-base transition-all font-medium text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Location Input */}
          <div className="form-control w-full md:w-[38%]">
            <label className="label pl-2 pb-1">
              <span className="label-text font-semibold text-gray-500 text-xs tracking-wider uppercase">
                Location
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="City, Venue, or Online"
                className="input w-full pl-11 bg-gray-50 border-transparent focus:border-primary focus:bg-white focus:outline-none focus:ring-0 rounded-2xl h-14 text-base transition-all font-medium text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="form-control w-full md:w-[24%]">
            <button className="btn btn-secondary w-full h-14 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 hover:bg-primary hover:text-secondary hover:border-primary font-bold text-lg flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
