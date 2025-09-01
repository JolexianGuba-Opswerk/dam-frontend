import { FcClock } from "react-icons/fc";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../hooks/employee-side/useCurrentUser";
import CustomLoading from "../../components/utils/CustomLoading";
import { Navigate } from "react-router-dom";

const VerificationPending = () => {
  const queryclient = useQueryClient();
  const onConfirm = async () => {
    queryclient.clear();
    window.location.href = "http://127.0.0.1:8000/api/logout/";
  };
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <CustomLoading />;
  }
  if (!user.is_superuser && user.employee_profile.is_verified) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-50 p-5 border-b border-blue-100 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 border border-blue-100">
              <FcClock className="text-3xl" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Verification Pending
            </h1>
            <p className="text-gray-600 text-sm mt-1">Dev Assets Manager</p>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Thank you for registering!
            </h2>
            <p className="text-gray-600 text-sm">
              Your account is currently under review by our administration team.
            </p>
          </div>

          {/* Status Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  What happens next?
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Our team will verify your account details</li>
                    <li>You'll receive an email once approved</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-700">
                Registration
              </span>
              <span className="text-xs font-medium text-blue-600">
                Verification
              </span>
              <span className="text-xs font-medium text-gray-400">Access</span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: "50%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="text-center text-xs text-gray-500 mb-6">
            <p>If you have any questions, please contact our support team at</p>
            <a
              href="mailto:support@devassets.com"
              className="text-blue-500 font-medium"
            >
              support@devassets.com
            </a>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onConfirm}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
