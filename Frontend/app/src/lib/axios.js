import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://verbio-vygl.onrender.com/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});