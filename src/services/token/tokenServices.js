import publicApi from "../employee/api/publicApi";

export async function getRefreshToken() {
  const { data } = await publicApi.patch("token/refresh/");
  return data;
}

export async function getAccessToken() {
  const { data } = await publicApi.patch("token/access/");
  return data
}


