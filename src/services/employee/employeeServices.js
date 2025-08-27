import privateClient from "./api/privateApi";


export async function getCredentials(id) {
  const { data } = await privateClient.get(`employees-side/${id}/`);
  console.log("Employee-data:",data);
  return data;
}


export async function updateCredentials(formData) {
  const { data } = await privateClient.patch(`employees-side/${formData.id}/`, formData.credentials);
  return data;
}


export async function currentUser() {
  const { data } = await privateClient.get("auth/me/");
  console.log(data);
  return data;
}
