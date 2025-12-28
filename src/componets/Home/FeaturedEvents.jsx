import React from 'react';
import { motion } from 'framer-motion';
import EventCard from '../Event/EventCard';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Loading from '../Shared/Loading'; // if not already imported

const FeaturedEvents = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: eventsdata = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4">Featured Events</h2>
          <p className="text-xl text-base-content-secondary max-w-2xl mx-auto">
            Don't miss out on these trending events happening around you.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {eventsdata.slice(0, 6).map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <button className="btn btn-outline btn-lg rounded-full px-10">
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
