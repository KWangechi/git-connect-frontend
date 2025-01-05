// This file is responsible for configuring axios to accept a BaseURL and also use interceptors
import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/";

const api = axios.create({
  baseURL,
});

// configure interceptors
export { api };
