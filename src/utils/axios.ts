/**
 * This file is responsible for configuring axios using a baseURL and also use interceptors
 *
 */
import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/";

const accessToken = localStorage.getItem("accessToken");

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer: ${accessToken}`,
    Origin: "http://localhost:5173",
  },
});


// // Response interceptor to handle 403 status code
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the response status code is 403
    if (error.response && error.response.status === 403) {
      alert("Session expired! Sign In again...")
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("tokenExpiryDate");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { api };
