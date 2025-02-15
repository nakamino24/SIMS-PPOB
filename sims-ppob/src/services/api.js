import axios from "axios";

// Base URL API
const API_URL = "https://take-home-test-api.nutech-integrasi.com";

// Axios Instance
const apiRequest = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor for Authorization
apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiRequest;
