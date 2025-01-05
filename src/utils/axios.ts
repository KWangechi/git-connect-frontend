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
  },
});

// configure interceptors
export { api };
