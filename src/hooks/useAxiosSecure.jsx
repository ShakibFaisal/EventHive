import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const axiosSecure = axios.create({
  baseURL: "https://event-hive-server-team.vercel.app",
});

const UseAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // intercept request - FETCH FRESH TOKEN ON EVERY REQUEST
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            // Get fresh token for every request
            const freshToken = await user.getIdToken();
            config.headers.Authorization = `Bearer ${freshToken}`;
            console.log("✅ Token added to request:", config.url);
          } catch (error) {
            console.error("❌ Error getting token:", error);
          }
        } else {
          console.log("⚠️ No user, skipping auth header");
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        console.log("✅ Response from:", response.config.url, response.status);
        return response;
      },
      (error) => {
        console.log("❌ Axios Error:", error.message);
        console.log("❌ Status:", error.response?.status);
        console.log("❌ Data:", error.response?.data);

        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          console.log("🚪 Unauthorized - logging out");
          logOut().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default UseAxiosSecure;
