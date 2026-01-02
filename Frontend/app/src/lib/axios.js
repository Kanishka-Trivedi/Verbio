import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://verbio-vygl.onrender.com/api",
  baseURL: "https://verbio-vygl.onrender.com/api",
  withCredentials: true,
});