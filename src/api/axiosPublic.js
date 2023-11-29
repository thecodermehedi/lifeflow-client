import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_MODE === 'production' 
  ? (import.meta.env.VITE_API_URL_PROD || import.meta.env.VITE_API_URL_BACKUP) 
  : import.meta.env.VITE_API_URL_DEV,
});

export default axiosPublic;