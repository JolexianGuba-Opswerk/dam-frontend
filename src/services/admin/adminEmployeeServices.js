import privateApi from "../api/privateApi";

export const getAllEmployee = async ({
  page,
  ordering,
  department,
  position,
  isVerifiedFilter,
  search,
}) => {
  const params = {};
  if (page) params.page = page;
  if (ordering && ordering !== "") params.ordering = ordering;
  if (department && department !== "") params.department = department;
  if (position && position !== "") params.position = position;
  if (isVerifiedFilter && isVerifiedFilter !== "")
    params.is_verified = isVerifiedFilter === "true";
  if (search && search !== "") params.search = search;

  const { data } = await privateApi.get("/employees/", { params });

  return data;
};

export const createEmployee = async (formData) => {
  const data = await privateApi.post(`/employees/`, formData.credentials);

  return data;
};

export const getEmployeeDetails = async (id) => {
  const { data } = await privateApi.get(`/employees/${id}/`);

  return data;
};

export const updateEmployeeDetails = async (formData) => {
  console.log("Data to be updated:", formData.credentials);
  const data = await privateApi.patch(
    `/employees/${formData.id}/`,
    formData.credentials
  );
  console.log("Updated Employee", data);

  return data;
};

export const deleteEmployee = async (id) => {
  const data = await privateApi.delete(`/employees/${id}/`);
  return data;
};
