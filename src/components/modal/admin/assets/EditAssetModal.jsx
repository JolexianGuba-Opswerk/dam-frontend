import { useEffect, useState } from "react";
import {
  FiX,
  FiSave,
  FiUser,
  FiCalendar,
  FiFileText,
  FiTag,
  FiHash,
  FiEdit3,
  FiTrash2,
  FiBox,
} from "react-icons/fi";
import { FaCubes } from "react-icons/fa";
import { useGetAssetDetails } from "../../../../hooks/admin/assets/useGetAssetDetails";
import { useGetEmployeeDrop } from "../../../../hooks/admin/employee/useGetEmployeeDrop";
import { useGetCategoryDrop } from "../../../../hooks/admin/assets/useGetCategoryDrop";
import QueryStatus from "../../../utils/QueryStatus";
import { useUpdateAsset } from "../../../../hooks/admin/assets/useUpdateAsset";
import ErrorMessage from "../../../utils/ErrorMessage";
import { useDeleteAsset } from "../../../../hooks/admin/assets/useDeleteAsset";
import { DeleteConfirmationModal } from "../../../utils/DeleteConfirmationModal";
import { useParams } from "react-router-dom";
const EditAssetModal = ({ isOpen, onClose }) => {
  const { id: assetId } = useParams();
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
  const { data, isLoading, isError, error, refetch } = useGetAssetDetails(
    assetId,
    isOpen
  );
  const mutation = useUpdateAsset();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(
      {
        id: assetId,
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
          onClose(true);
        },
      }
    );
  };

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        name: data.name || "",
        serial_number: data.serial_number || "",
        category: data.category?.id || "",
        assigned_to: data.assigned_to?.id || "",
        purchase_date: data.purchase_date || "",
        status: data.status || "",
        description: data.description || "",
        notes: data.notes || "",
      });
    }
  }, [data, assetId, isOpen]);

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
    onClose(true);
  };

  // Delete Section Logic
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const deleteMutation = useDeleteAsset();

  const openModal = () => {
    setOpenDeleteModal(true);
  };

  const handleOnDelete = () => {
    if (assetId) {
      console.log("On delete");
      deleteMutation.mutate(assetId, {
        onSuccess: () => {
          setOpenDeleteModal(false);
          onClose(true);
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaCubes className="mr-2 text-blue-500" />
            Edit Asset
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Modal Body */}

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
          loadingText="Loading your assets..."
          data={data}
          errorTitle="Failed to load assets"
        >
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
                  value={formData.category || ""}
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
                onClick={() => {
                  openModal();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>

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
                disabled={mutation.isLoading}
                className="px-5 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
              >
                <FiSave className="mr-2" />
                Save
              </button>
            </div>
          </form>
        </QueryStatus>
      </div>
      <DeleteConfirmationModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleOnDelete}
        message={"Are you sure you want to delete this asset?"}
      />
    </div>
  );
};

export default EditAssetModal;
