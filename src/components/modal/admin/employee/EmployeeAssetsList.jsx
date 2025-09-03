import { useState } from "react";
import { FiX, FiBox, FiSearch, FiLoader } from "react-icons/fi";
import { useGetEmployeeAssets } from "../../../../hooks/admin/employee/useGetEmployeeAssets";

const EmployeeAssetsModal = ({ isOpen, onClose, employee }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useGetEmployeeAssets(
    employee,
    isOpen
  );

  if (!isOpen || !employee) return null;

  // Safely filter assets with fallback for undefined data
  const filteredAssets = (data?.assets || []).filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FiBox className="mr-2 text-blue-500" />
            Assets Assigned to {employee.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-8 text-center">
            <FiLoader
              className="mx-auto animate-spin text-blue-500"
              size={32}
            />
            <p className="mt-4 text-gray-500">Loading assets...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-8 text-center">
            <p className="text-red-500">
              Error loading assets: {error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State */}
        {!isLoading && !isError && (
          <>
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assets by name, serial number, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Assets List */}
            <div className="overflow-y-auto p-4 max-h-[400px]">
              {filteredAssets.length > 0 ? (
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">
                              {asset.name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              <span className="font-medium">
                                Serial Number:
                              </span>{" "}
                              {asset.serial_number}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Category:</span>{" "}
                              {asset.category}
                            </p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Assigned
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <FiBox className="mx-auto text-gray-300" size={48} />
                  <p className="mt-4 text-gray-500">
                    {searchTerm
                      ? "No assets match your search"
                      : "No assets assigned to this employee"}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {/* Showing {filteredAssets.length} of {data.assets.length} assets */}
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeAssetsModal;
