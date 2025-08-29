import { useState } from "react";
import {
  FiX,
  FiUser,
  FiUserPlus,
  FiMail,
  FiBriefcase,
  FiLock,
  FiAward,
  FiCheckCircle,
} from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { useDepartmentDrop } from "../../../../hooks/admin/employee/useDepartmentDrop";
import { useCreateEmployee } from "../../../../hooks/admin/employee/useCreateEmployee";
import ErrorMessage from "../../../utils/ErrorMessage";

const CreateEmployeeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    is_verified: false,
  });

  const { data: department } = useDepartmentDrop();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useCreateEmployee();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isVerifiedBoolean = formData.is_verified === "true";
    mutation.mutate(
      {
        credentials: {
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          department: formData.department,
          position: formData.position,
          is_verified: isVerifiedBoolean,
        },
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            onClose(true);
          }, 200);
        },
      }
    );
  };

  const handleClose = () => {
    mutation.reset();
    setFormData({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      department: "",
      position: "",
      is_verified: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUserPlus className="mr-2 text-blue-500" />
            Create Employee
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <FiX size={24} />
          </button>
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* First Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiUser className="mr-2 text-gray-500" />
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                required="true"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiUser className="mr-2 text-gray-500" />
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter last name"
              />
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiUser className="mr-2 text-gray-500" />
                Username
              </label>
              <input
                type="text"
                name="username"
                required="true"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiMail className="mr-2 text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required="true"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            {/* Department Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiBriefcase className="mr-2 text-gray-500" />
                Department
              </label>
              <select
                name="department"
                required="true"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Select Department --</option>
                {department?.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.full_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiLock className="mr-2 text-gray-500" />
                Password
              </label>
              <input
                type="password"
                name="password"
                required="true"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            {/* Position Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiAward className="mr-2 text-gray-500" />
                Position
              </label>
              <input
                type="text"
                required="true"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter position title"
              />
            </div>

            {/* Verification Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiCheckCircle className="mr-2 text-gray-500" />
                Verification Status
              </label>
              <select
                name="is_verified"
                required="true"
                value={formData.is_verified}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="false">Not Verified</option>
                <option value="true">Verified</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
            >
              <FiX className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <FiUserPlus className="mr-2" />
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeModal;
