import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_BACK_URL || "http://localhost:7088";
const TOKEN_REFRESH_MARGIN = 5 * 60 * 1000; // 5 minutos en milisegundos


export const axiosInstanceBearer = axios.create({
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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const addTokenToRequest = async (config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now();
    const tokenExpirationTime = decodedToken.exp * 1000; 

    
    if (tokenExpirationTime - currentTime < TOKEN_REFRESH_MARGIN && !isRefreshing) {
      try {
        await refreshAuthToken(); 
      } catch (error) {
        console.error('Error al renovar el token:', error);
        sessionStorage.clear();
        window.location.href = '/';
        return Promise.reject(error);
      }
    }

    const newToken = sessionStorage.getItem("token");
    config.headers.Authorization = `Bearer ${newToken}`;
  }

  return config;
};

const refreshAuthToken = async () => {
  if (isRefreshing) {
    return new Promise(function (resolve, reject) {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const refreshResponse = await axiosInstanceBearer.post('/refresh', {
      refreshToken: refreshToken,
    });

    const newToken = refreshResponse.data.access_token;
    sessionStorage.setItem('token', newToken);
    isRefreshing = false;
    processQueue(null, newToken);

    return newToken;
  } catch (error) {
    isRefreshing = false;
    processQueue(error, null);
    throw error;

  }
};

const handleTokenExpiration = async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const newToken = await refreshAuthToken();

      axiosInstanceBearer.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      axiosInstanceFormData.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

      return axios(originalRequest);
    } catch (refreshError) {
      console.error('Error al renovar el token:', refreshError);
      sessionStorage.clear();
      window.location.href = '/';
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

axiosInstanceBearer.interceptors.request.use(addTokenToRequest);
axiosInstanceFormData.interceptors.request.use(addTokenToRequest);

axiosInstanceBearer.interceptors.response.use(
  response => response,
  handleTokenExpiration
);

axiosInstanceFormData.interceptors.response.use(
  response => response,
  handleTokenExpiration
);
