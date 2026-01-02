import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import EventCard from "../Event/EventCard";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../Shared/Loading"; // if not already imported
import Paragraph from "../Shared/heading/Paragraph";
import Heading from "../Shared/heading/Heading";

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
    <div className="pb-12 pt-12 bg-[#fafafa]">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 mb-6 shadow-sm">
          Feature
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading className="text-5xl font-extrabold mb-4">
            Featured Events
          </Heading>
          <Paragraph className="text-[16px]  text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these trending events happening around you.
          </Paragraph>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {eventsdata.slice(0, 6).map((event, index) => (
            <motion.div
              key={event._id}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline btn-lg rounded-full px-10 bg-[#a3e635] text-black hover:bg-black hover:text-[#a3e635]"
            >
              View All Events
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
