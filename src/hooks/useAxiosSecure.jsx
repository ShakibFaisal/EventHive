import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const axiosSecure = axios.create({
  baseURL: "https://event-hive-server-team.vercel.app",
});

const UseAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get Firebase ID token
    const getToken = async () => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          setToken(idToken);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      } else {
        setToken(null);
      }
    };

    getToken();
  }, [user]);

  useEffect(() => {
    // intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("Axios Error:", error);

        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
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
  }, [token, logOut, navigate]);

  return axiosSecure;
};

export default UseAxiosSecure;
