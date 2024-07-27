import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL || "http://localhost:7088";

export const axionsInstanceBearer = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosInstanceFormData = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
})

axionsInstanceBearer.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})
axiosInstanceFormData.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})
