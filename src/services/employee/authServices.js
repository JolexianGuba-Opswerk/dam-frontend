import { publicApi } from './api/publicApi';


export async function loginUser(id, credentials) {
  const { data } = await publicApi.post(`employees-side/${id}/`, credentials);
  return data;
}

export async function forgetPassword(email) {
  const { data } = await publicApi.post(`forget-password/`, email);
  return data;
}

export async function verifyOtp(body) {
  const { data } = await publicApi.post(`forget-password/`, body);
  return data;
}


export async function resetPassword(newPassword) {
  const { data } = await publicApi.post(`reset-password/`, newPassword);
  return data;
}


export async function loginWithGoogle() {
  const res = await publicApi.get("oidc/authenticate/");
  return res.data.access_token;
};

export async function logout() {
  const res = await publicApi.get("logout/");
  return res
};


