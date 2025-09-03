import { useState } from "react";
import {
  FaHistory,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaCalendarAlt,
  FaBox,
  FaUserMinus,
  FaUserPlus,
  FaExchangeAlt,
} from "react-icons/fa";
import { useGetAllAssetHistory } from "../../../hooks/admin/assets/useGetAllAssetHistory";
import QueryStatus from "../../utils/QueryStatus";
import { useNavigate } from "react-router-dom";

const AssetHistory = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetAllAssetHistory({
    page,
    search,
  });

  const statusIcons = {
    assigned: {
      icon: <FaUserPlus className="text-green-500" />,
      color: "bg-green-100 text-green-800",
      label: "Assigned",
    },
    unassigned: {
      icon: <FaUserMinus className="text-red-500" />,
      color: "bg-red-100 text-red-800",
      label: "Unassigned",
    },
    reassigned: {
      icon: <FaExchangeAlt className="text-blue-500" />,
      color: "bg-blue-100 text-blue-800",
      label: "Reassigned",
    },
    unknown: {
      icon: <FaUser className="text-gray-500" />,
      color: "bg-gray-100 text-gray-800",
      label: "Unknown",
    },
  };

  const getStatus = (item) => {
    if (item.previous_user === null && item.new_user !== null) {
      return statusIcons.assigned;
    } else if (item.new_user === null && item.previous_user !== null) {
      return statusIcons.unassigned;
    } else if (item.previous_user !== null && item.new_user !== null) {
      return statusIcons.reassigned;
    } else {
      return statusIcons.unknown;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  return (
    <div className="h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaHistory className="mr-3 text-blue-500" /> Asset Assignment
            History
          </h1>
          <p className="text-gray-600 mt-2">
            Track all asset assignment changes across your organization
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Search + Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by asset name or serial number"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* History Table */}
          <QueryStatus
            query={{ isLoading, isError, error }}
            loadingText="Loading history records..."
            data={data?.results}
            errorTitle="Failed to load history"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Previous User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      New User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.results?.length > 0 ? (
                    data?.results?.map((item) => {
                      const status = getStatus(item);
                      return (
                        <tr
                          onClick={() =>
                            navigate(`/admin/assets/${item.asset.id}`)
                          }
                          key={item.asset.id}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaBox className="mr-2 text-gray-400" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {item.asset.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.asset.serial_number}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.previous_user ? (
                              <div className="flex items-center">
                                <FaUser className="mr-2 text-gray-400" />
                                <span className="text-sm text-gray-900">
                                  {item.previous_user}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.new_user ? (
                              <div className="flex items-center">
                                <FaUser className="mr-2 text-gray-400" />
                                <span className="text-sm text-gray-900">
                                  {item.new_user}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                {formatDate(item.change_date)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                            >
                              {status.icon}
                              <span className="ml-1">{status.label}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {item.notes || "—"}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center">
                        <FaHistory className="mx-auto h-12 w-12 text-gray-300" />
                        <p className="mt-4 text-gray-500">
                          No history records found
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </QueryStatus>
        </div>

        {/* Pagination */}
        {data && data.count > 0 && (
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
                {Math.ceil((data?.count || 0) / 10)}
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
        )}
      </div>
    </div>
  );
};

export default AssetHistory;
