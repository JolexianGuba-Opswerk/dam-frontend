import { useState } from "react";
import {
  FaLaptop,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaWifi,
  FaTools,
  FaBoxOpen,
  FaPlus,
} from "react-icons/fa";
import { useGetAllAssets } from "../../../hooks/admin/assets/useGetAllAssets";
import QueryStatus from "../../utils/QueryStatus";
import CreateAssetModal from "../../modal/admin/assets/CreateAssetModal";
import EditAssetModal from "../../modal/admin/assets/EditAssetModal";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const AssetManagement = () => {
  // React Router Section
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isCreateOpen = location.pathname.endsWith("/create");
  const isEditOpen = Boolean(id);

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError, error } = useGetAllAssets({
    page,
    category,
    status,
    search,
  });

  const statusIcons = {
    IN_USE: {
      icon: <FaWifi className="text-green-500" />,
      color: "bg-green-100 text-green-800",
    },
    REPAIR: {
      icon: <FaTools className="text-yellow-500" />,
      color: "bg-yellow-100 text-yellow-800",
    },
    IN_STORAGE: {
      icon: <FaBoxOpen className="text-blue-500" />,
      color: "bg-blue-100 text-blue-800",
    },
    RETIRED: {
      icon: <FaWifi className="text-gray-500" />,
      color: "bg-gray-100 text-gray-800",
    },
  };

  const statusLabels = {
    IN_USE: "In Use",
    REPAIR: "Repair",
    IN_STORAGE: "In Storage",
    RETIRED: "Retired",
  };

  const handleAssetEdit = (id) => {
    navigate(`/admin/assets/${id}`);
  };
  return (
    <div className="h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaLaptop className="mr-3 text-blue-500" /> Asset Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your organization's assets efficiently
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Search + Filters + Create */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search assets by name or serial number..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaFilter className="mr-2" /> Filters
            </button>

            <button
              onClick={() => navigate("/admin/assets/create")}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" /> Create
            </button>
          </div>
          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All Categories</option>
                  <option value="LAPTOP">Laptop</option>
                  <option value="DESKTOP">Desktop</option>
                  <option value="MONITOR">Monitor</option>
                  <option value="PHONE">Phone</option>
                  <option value="HEADSET">Headset</option>
                  <option value="TABLET">Tablet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All Statuses</option>
                  <option value="IN_USE">In Use</option>
                  <option value="REPAIR">Repair</option>
                  <option value="IN_STORAGE">In Storage</option>
                  <option value="RETIRED">Retired</option>
                </select>
              </div>
            </div>
          )}
          {/* Assets Table */}
          <QueryStatus
            query={{ isLoading, isError, error }}
            loadingText="Loading your assets..."
            data={data?.results}
            errorTitle="Failed to load assets"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name & Serial
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.results?.map((asset) => (
                    <tr
                      key={asset.id}
                      className="hover:bg-gray-50"
                      onClick={() => {
                        handleAssetEdit(asset.id);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {asset.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {asset.serial_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {asset.category || "Not specified"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusIcons[asset.status]?.color ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {statusIcons[asset.status]?.icon}
                          <span className="ml-1">
                            {statusLabels[asset.status] || asset.status}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {asset.description}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </QueryStatus>

          {/* Modals */}

          {isCreateOpen && (
            <CreateAssetModal
              isOpen={isCreateOpen}
              onClose={() => navigate("/admin/assets")}
            />
          )}
          {isEditOpen && (
            <EditAssetModal
              isOpen={isEditOpen}
              onClose={() => {
                navigate("/admin/assets");
              }}
            />
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-white px-6 py-3 rounded-lg shadow-md">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={!data?.previous || page === 1}
            className={`flex items-center px-4 py-2 rounded-md ${
              !data?.previous || page === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <FaChevronLeft className="mr-1" /> Previous
          </button>

          <span className="text-sm text-gray-700">
            Page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">
              {Math.ceil((data?.count || 0) / 5)}
            </span>
          </span>

          <button
            onClick={() => setPage((old) => old + 1)}
            disabled={!data?.next}
            className={`flex items-center px-4 py-2 rounded-md ${
              !data?.next
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next <FaChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;
