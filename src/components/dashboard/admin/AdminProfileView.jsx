import { useCurrentUser } from "../../../hooks/employee-side/useCurrentUser";

import QueryStatus from "../../utils/QueryStatus";
import { useState, useEffect } from "react";
import { FaUser, FaBuilding, FaEnvelope, FaIdBadge } from "react-icons/fa";
import ErrorMessage from "../../utils/ErrorMessage";
import { useDepartmentDrop } from "../../../hooks/admin/employee/useDepartmentDrop";
import { useUpdateEmployeeDetails } from "../../../hooks/admin/employee/useUpdateEmployeeDetails";

const AdminProfileView = () => {
  const { data: user, isLoading, isError, error, refetch } = useCurrentUser();
  const { data: departmentOptions } = useDepartmentDrop();
  const mutation = useUpdateEmployeeDetails();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    position: "",
    department: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.first_name || "",
        lastName: user?.last_name || "",
        username: user?.username || "",
        email: user?.email || "",
        position: user?.employee_profile?.position || "",
        department: user?.employee_profile?.department || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: user.id,
      credentials: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        position: formData.position,
        department: formData.department,
      },
    });

    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
        <p className="text-gray-600">Manage your admin account information</p>
      </div>

      {/* Error Handler Section */}
      {mutation.isError && (
        <div className="space-y-2 mb-4">
          {mutation.error.response?.status === 403 ? (
            <ErrorMessage message="You do not have permission to update this asset." />
          ) : mutation.error.response?.status === 400 ? (
            // Bad request / validation errors
            Object.entries(mutation.error.response.data).map(
              ([field, messages]) => (
                <ErrorMessage
                  key={field}
                  message={`${field}: ${messages[0]}`}
                />
              )
            )
          ) : (
            <ErrorMessage
              message={mutation.error?.message || "Something went wrong"}
            />
          )}
        </div>
      )}
      <QueryStatus
        query={{ isLoading, isError, error, refetch }}
        loadingText="Loading your credentials..."
        data={user}
        errorTitle="Failed to load credentials"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 flex items-center space-x-5">
            <div className="flex-shrink-0">
              {user?.employee_profile?.avatar_url ? (
                <img
                  src={user.employee_profile.avatar_url}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                  {formData.firstName?.charAt(0) ||
                    formData.username?.charAt(0) ||
                    "U"}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {formData.firstName || "Not specified"} {formData.lastName}
              </h1>
              <p className="text-sm text-gray-500">
                {formData.position || "Not specified"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6">
              {/* First Name */}
              <Field
                icon={<FaUser className="text-gray-500" />}
                label="First Name"
                name="firstName"
                value={formData.firstName}
                isEditing={isEditing}
                onChange={handleInputChange}
              />

              {/* Last Name */}
              <Field
                icon={<FaUser className="text-gray-500" />}
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                isEditing={isEditing}
                onChange={handleInputChange}
              />

              {/* Username */}
              <Field
                icon={<FaIdBadge className="text-gray-500" />}
                label="Username"
                name="username"
                value={formData.username}
                isEditing={isEditing}
                onChange={handleInputChange}
              />

              {/* Email */}
              <Field
                icon={<FaEnvelope className="text-gray-500" />}
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                isEditing={isEditing}
                onChange={handleInputChange}
              />

              {/* Position */}
              <Field
                icon={<FaUser className="text-gray-500" />}
                label="Position"
                name="position"
                value={formData.position}
                isEditing={isEditing}
                onChange={handleInputChange}
              />

              {/* Department (dropdown) */}
              <div>
                <label className="block text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaBuilding className="text-gray-500" /> Department
                </label>
                {isEditing ? (
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select Department</option>
                    {departmentOptions?.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.full_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="mt-1 text-gray-900">
                    {formData.department || "Not specified"}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        firstName: user?.first_name || "",
                        lastName: user?.last_name || "",
                        username: user?.username || "",
                        email: user?.email || "",
                        position: user?.employee_profile?.position || "",
                        department: user?.employee_profile?.department || "",
                      });
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      alert("Change Password functionality coming soon!")
                    }
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Change Password
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </QueryStatus>
    </div>
  );
};

const Field = ({
  icon,
  label,
  name,
  value,
  isEditing,
  onChange,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 flex items-center gap-2">
      {icon} {label}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
      />
    ) : (
      <p className="mt-1 text-gray-900">{value || "Not specified"}</p>
    )}
  </div>
);

export default AdminProfileView;
