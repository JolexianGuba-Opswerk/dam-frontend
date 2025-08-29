import { FaTools, FaHistory } from "react-icons/fa";

const AssetHistory = () => {
  return (
    <div className="h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaHistory className="mr-3 text-blue-500" /> Asset History
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor your organization's assets history
          </p>
        </div>

        {/* Main Card */}
        <div className="max-h-xl mx-auto bg-white rounded-lg shadow-md p-10 text-center">
          {/* Icon */}
          <FaTools className="mx-auto text-6xl text-yellow-500 mb-4" />

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">
            Page Under Development
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mt-2">
            We’re currently working on this feature. Please check back soon!
          </p>

          {/* Optional Back/Home Button */}
          <button
            onClick={() => window.history.back()}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetHistory;
