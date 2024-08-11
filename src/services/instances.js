import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL || "http://localhost:7088";


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

const addTokenToRequest = (config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const handleTokenExpiration = async (error) => {
  const originalRequest = error.config;

  // Verifica si el error es 401 y si no es un intento de refresh
  console.log(error)
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      // Llamada al servicio de refreshToken para obtener un nuevo token
      const refreshToken = sessionStorage.getItem("refreshToken");
      console.log(refreshToken)
      const refreshResponse = await axiosInstanceBearer.post('/refresh', {
        refreshToken:refreshToken,
      });
      console.log(refreshResponse)

      // Guardar el nuevo token en sessionStorage
      const newToken = refreshResponse.data.access_token;
      sessionStorage.setItem('token', newToken);

      // Actualiza el token en la solicitud original
      axiosInstanceBearer.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      axiosInstanceFormData.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

      // Reintentar la solicitud original
      return axios(originalRequest);
    } catch (refreshError) {
      console.error('Error al renovar el token:', refreshError);
      sessionStorage.clear();
      window.location.href = '/';
      // Redirige al login o realiza alguna acción
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
