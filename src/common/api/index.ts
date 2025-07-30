import axios from "axios";

const base_uri = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${base_uri}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
