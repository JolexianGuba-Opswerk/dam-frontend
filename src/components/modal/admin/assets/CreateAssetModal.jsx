import { useState } from "react";
import {
  FiX,
  FiSave,
  FiUser,
  FiCalendar,
  FiFileText,
  FiTag,
  FiHash,
  FiEdit3,
  FiCheckCircle,
  FiBox,
} from "react-icons/fi";
import { FaCubes } from "react-icons/fa";
import { useGetEmployeeDrop } from "../../../../hooks/admin/employee/useGetEmployeeDrop";
import { useGetCategoryDrop } from "../../../../hooks/admin/assets/useGetCategoryDrop";
import { useCreateAsset } from "../../../../hooks/admin/assets/useCreateAsset";
import ErrorMessage from "../../../utils/ErrorMessage";

const AssetCreateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    serial_number: "",
    category: "",
    assigned_to: "",
    purchase_date: "",
    status: "",
    description: "",
    notes: "",
  });
  const { data: employee } = useGetEmployeeDrop();
  const { data: category } = useGetCategoryDrop();
  const mutation = useCreateAsset();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(
      {
        credentials: {
          name: formData.name,
          serial_number: formData.serial_number,
          category: formData.category,
          assigned_to: formData.assigned_to,
          purchase_date: formData.purchase_date,
          status: formData.status,
          description: formData.description,
          notes: formData.notes,
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

  // Clearing out prev mutations
  const handleClose = () => {
    mutation.reset();
    setFormData({
      name: "",
      serial_number: "",
      category: "",
      assigned_to: "",
      purchase_date: "",
      status: "",
      description: "",
      notes: "",
    });
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaCubes className="mr-2 text-blue-500" />
            Create Asset
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Error Responses */}
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
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiBox className="mr-1" />
                Asset Name
              </label>
              <input
                type="text"
                name="name"
                required="true"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter asset name"
              />
            </div>

            {/* Serial Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Serial Number
              </label>
              <input
                type="text"
                name="serial_number"
                required="true"
                value={formData.serial_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter serial number"
              />
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiTag className="mr-1" /> Category
              </label>
              <select
                name="category"
                required="true"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Select Category --</option>
                {category?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="IN_USE">In Use</option>
                <option value="IN_STORAGE">In Storage</option>
                <option value="REPAIR">Under Repair</option>
                <option value="RETIRED">Retired</option>
              </select>
            </div>

            {/* Assigned To Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiUser className="mr-1" /> Assigned To
              </label>
              <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Select Employee --</option>
                {employee?.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.full_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Purchase Date Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiCalendar className="mr-1" /> Purchase Date
              </label>
              <input
                type="date"
                required="true"
                name="purchase_date"
                value={formData.purchase_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiFileText className="mr-1" /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter asset description"
            />
          </div>

          {/* Notes Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiEdit3 className="mr-1" /> Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter additional notes"
            />
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center"
            >
              <FiSave className="mr-2" />
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetCreateModal;
