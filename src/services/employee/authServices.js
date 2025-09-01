import { publicApi } from "../api/publicApi";

export async function loginUser(credentials) {
  const { data } = await publicApi.post("token/", credentials);
  console.log(data);
  return data;
}

export async function forgetPassword(email) {
  const { data } = await publicApi.post(`forget-password/`, email);
  return data;
}

export async function verifyOtp(body) {
  const { data } = await publicApi.post(`verify-otp/`, body);
  console.log(data);
  return data;
}

export async function resetPassword(new_password, access_token) {
  publicApi.interceptors.request.use(
    async (config) => {
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const { data } = await publicApi.post(`reset-password/`, { new_password });
  return data;
}

export async function loginWithGoogle() {
  const res = await publicApi.get("oidc/authenticate/");
  return res.data.access_token;
}

export async function logout() {
  const res = await publicApi.get("logout/");
  return res;
}
