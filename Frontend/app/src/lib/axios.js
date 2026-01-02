import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://verbio-vygl.onrender.com/api",
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});