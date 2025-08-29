import axios from "axios";
import { publicApi } from "./publicApi";
// import { getRefreshToken } from '../../token/tokenServices';

const privateApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await publicApi.post(
          "/token/refresh/",
          {},
          {
            withCredentials: true,
          }
        );

        return privateApi(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default privateApi;
