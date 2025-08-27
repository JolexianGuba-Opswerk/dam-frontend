import axios from 'axios';
// import { getRefreshToken } from '../../token/tokenServices';

const privateApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

// privateApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check for a 401 error and make sure it's not a retry request
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await getRefreshToken();
//         return privateApi(originalRequest);
//       } catch (refreshError) {
//         window.location.href = '/login/';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default privateApi;