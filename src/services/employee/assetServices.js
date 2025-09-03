import privateApi from "../api/privateApi";

export const getAssets = async (id) => {
  const { data } = await privateApi.get(`/employees-side/asset/${id}/`);
  return data.assets;
};

export const getAssetsList = async (id) => {
  const { data } = await privateApi.get(`/assets/employee/${id}/`);
  console.log(data);
  return data;
};
