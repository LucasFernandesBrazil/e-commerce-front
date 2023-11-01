import axios from "axios";
export const axiosClient = axios.create({
  baseURL: process.env.API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const auth = JSON.parse(window.sessionStorage.getItem("auth") || '{}');
  const user = JSON.parse(window.sessionStorage.getItem("user") || '{}');
  
  if (auth?.token) {
    config.headers["Authorization"] = `Bearer ${auth.token}`;
  }
  return config;
});

module.exports = {
  axiosClient
};