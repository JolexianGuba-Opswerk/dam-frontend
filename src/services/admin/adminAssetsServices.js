import privateApi from "../api/privateApi";

export const getAssets = async ({ page, category, status, search }) => {
  const params = {};
  if (page) params.page = page;
  if (category && category !== "") params.category = category;
  if (status && status !== "") params.status = status;
  if (search && search !== "") params.search = search;

  const { data } = await privateApi.get("/assets/", { params });
  return data;
};

export const getAssetHistory = async ({ page, search }) => {
  const params = {};
  if (page) params.page = page;

  if (search && search !== "") params.search = search;

  const { data } = await privateApi.get("/assets/history/", { params });
  console.log(data);
  return data;
};
export const getAssetDetails = async (id) => {
  const { data } = await privateApi.get(`/assets/${id}/`);
  return data;
};
export const createAsset = async (formData) => {
  const data = await privateApi.post(`/assets/`, formData.credentials);

  return data;
};

export const updateAssetDetails = async (formData) => {
  const data = await privateApi.patch(
    `/assets/${formData.id}/`,
    formData.credentials
  );

  return data;
};

export const deleteAsset = async (id) => {
  const data = await privateApi.delete(`/assets/${id}/`);
  return data;
};

export const getEmployeeDropdown = async () => {
  const { data } = await privateApi.get("/employees/drop-downs/");
  return data;
};

export const getCategoryDropdown = async () => {
  const { data } = await privateApi.get("/category/drop-downs/");
  return data;
};

export const getDepartmentDropdown = async () => {
  const { data } = await privateApi.get("/department/drop-downs/");
  return data;
};
