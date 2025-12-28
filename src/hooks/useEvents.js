import { useState, useEffect } from "react";
import api from "../utils/api";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEvents([
          {
            id: 1,
            title: "Tech Conference 2025",
            date: "Dec 25, 2025",
            location: "Convention Hall",
            price: "$50",
            image: "/tech-conference .jpg",
          },
          {
            id: 2,
            title: "Music Fest",
            date: "Jan 10, 2026",
            location: "Open Grounds",
            price: "$80",
            image: "/music-fest.jpg",
          },
          {
            id: 3,
            title: "Art Exhibition",
            date: "Feb 14, 2026",
            location: "City Gallery",
            price: "$20",
            image: "/art-exhibition.jpg",
          },
          {
            id: 4,
            title: "Food Carnival",
            date: "Mar 01, 2026",
            location: "City Park",
            price: "Free",
            image: "/food-carnival.jpg",
          },
          {
            id: 5,
            title: "Startup Pitch",
            date: "Apr 05, 2026",
            location: "Innovation Hub",
            price: "$100",
            image: "/startup-pitch.jpg",
          },
          {
            id: 6,
            title: "Yoga Retreat",
            date: "May 20, 2026",
            location: "Serene Valley",
            price: "$150",
            image: "/yoga-retreat.jpg",
          },
        ]);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

export default useEvents;
