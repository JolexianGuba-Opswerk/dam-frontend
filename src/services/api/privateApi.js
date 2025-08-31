import axios from "axios";
import { publicApi } from "./publicApi";

const privateApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    // If error is 401 and havent requested again
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token (cookies handle auth)
        await publicApi.post("/token/refresh/", {}, { withCredentials: true });

        // Retry the original request
        return privateApi({
          ...originalRequest,
          withCredentials: true,
        });
      } catch (refreshError) {
        // force logout
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default privateApi;
