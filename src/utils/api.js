import axios from "axios";

// Create an Axios instance for public endpoints (no auth required)
const api = axios.create({
  baseURL: "https://event-hive-server-team.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
