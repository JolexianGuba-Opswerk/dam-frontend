import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <FaLock className="text-red-500 text-5xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page. Please contact your
          administrator if you think this is a mistake.
        </p>

        <Link
          onClick={() => window.history.back()}
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
