import { useAssets } from "../../../hooks/employee-side/useAssets";
import QueryStatus from "../../utils/QueryStatus";
import { useCurrentUser } from "../../../hooks/employee-side/useCurrentUser";
import { formatStatus, getStatusColor } from "../../utils/StatusBadge";
import { FaWifi, FaTools, FaBoxOpen } from "react-icons/fa"; // ✅ import icons

const AssetsView = () => {
  const { data: user } = useCurrentUser();
  const {
    data: assets,
    isLoading,
    isError,
    error,
    refetch,
  } = useAssets(user?.id);

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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Assets</h1>
        <p className="text-gray-600">Equipment assigned to you</p>
      </div>

      <QueryStatus
        query={{ isLoading, isError, error, refetch }}
        loadingText="Loading your assets..."
        data={assets}
        errorTitle="Failed to load assets"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets &&
            assets.map((asset) => {
              const statusData = statusIcons[asset.status] || {};
              return (
                <div
                  key={asset.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {asset.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {asset.category} - ({asset.serial_number})
                      </span>
                    </div>

                    {/* ✅ Badge with icon */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        asset.status
                      )}`}
                    >
                      {statusData.icon}
                      {formatStatus(asset.status)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {asset.description}
                  </p>
                </div>
              );
            })}
        </div>
      </QueryStatus>
    </div>
  );
};
export default AssetsView;
