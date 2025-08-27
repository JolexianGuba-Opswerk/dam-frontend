import privateApi from "./api/privateApi";

export const getAssets = async (id) => {
  const {data} = await privateApi.get(`/employees-side/asset/${id}/`);
  return data.assets;
};
