import { useAssets } from "../../../hooks/useAssets";
import QueryStatus from "../../utils/QueryStatus";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { formatStatus, getStatusColor } from "../../utils/StatusBadge";




const AssetsView = () => {
  const { data: user } = useCurrentUser();
  const { data: assets, isLoading, isError, error, refetch} = useAssets(user?.id);
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
        {assets && assets.map(asset => (
          <div key={asset.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{asset.name}</h3>
                <span className="text-sm text-gray-500">{asset.category} - ({asset.serial_number})</span>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                {formatStatus(asset.status)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
             <p className="text-sm text-gray-600 mb-4">{asset.description}</p>
            </div>
          </div>
        ))}
      </div>
      </QueryStatus>
    </div>
  );
};
export default AssetsView;