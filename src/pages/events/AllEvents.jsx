import React, { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

import EventCard from "../../componets/Event/EventCard";
import NoEventFound from "../../componets/Event/NoEventFound";
import Loading from "../../componets/Shared/Loading";

const ITEMS_PER_PAGE = 12;

const AllEvents = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceSort, setPriceSort] = useState("");

  // Fetch events
  const { data: eventsRaw = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await api.get("/events");
      return res.data;
    },
  });

  // Defensive: ensure events is always an array
  const events = Array.isArray(eventsRaw) ? eventsRaw : [];

  const filteredEvents = events
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.location.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      if (priceSort === "low") return a.price - b.price;
      if (priceSort === "high") return b.price - a.price;
      return 0; 
    });

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-secondary text-4xl text-center font-extrabold mt-[150px]">
        Available Events
      </h3>

      {/* Search */}
      <div className="flex justify-center mt-6 gap-4">
        <input
          type="text"
          placeholder="Search events..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {/* Price Filter */}
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <option value="">Sort by Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <Suspense fallback={<Loading />}>
        {currentItems.length > 0 ? (
          <>
            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
              {currentItems.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mb-10 flex-wrap">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page + 1
                        ? "bg-secondary text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center h-[400px] px-5">
            <NoEventFound />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default AllEvents;
