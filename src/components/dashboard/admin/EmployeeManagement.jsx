import { useState } from "react";
import {
  FaLaptop,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaUser,
} from "react-icons/fa";
import QueryStatus from "../../utils/QueryStatus";
import CreateEmployeeModal from "../../modal/admin/employee/CreateEmployeeModal";
import { useGetAllEmployee } from "../../../hooks/admin/employee/useGetAllEmployee";
import EditEmployeeModal from "../../modal/admin/employee/EditEmployeeModal";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const EmployeeManagement = () => {
  // React Router Section
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEditOpen = Boolean(id);
  const isCreateOpen = location.pathname.endsWith("/create");

  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isVerifiedFilter, setIsVerifiedFilter] = useState("");

  const { data, isLoading, isError, error } = useGetAllEmployee({
    page,
    ordering,
    position,
    department,
    isVerifiedFilter,
    search,
  });

  const handleEmployeeId = (id) => {
    navigate(`/admin/employees/${id}`);
  };

  return (
    <div className="h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaUser className="mr-3 text-blue-500" /> Employee Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your organization's employee
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
                placeholder="Search employee by name, username and email ..."
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
              onClick={() => {
                navigate("/admin/employees/create");
              }}
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
                  Department
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All Department</option>
                  <option value="it">Information Technology</option>
                  <option value="hr">Human Resource</option>
                  <option value="sre">Site Reliability Engineer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={isVerifiedFilter}
                  onChange={(e) => {
                    setIsVerifiedFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All Statuses</option>
                  <option value="true">Verified</option>
                  <option value="false">Not Verified</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order by
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ordering}
                  onChange={(e) => {
                    setOrdering(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">None</option>
                  <option value="id">ID - asc</option>
                  <option value="-id">ID - desc</option>
                  <option value="username">Username - asc</option>
                  <option value="-username">Username - desc</option>
                  <option value="email">Email - asc</option>
                  <option value="-email">Email - desc</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer"
                  value={position}
                  onChange={(e) => {
                    setPosition(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          )}
          {/* Assets Table */}
          <QueryStatus
            query={{ isLoading, isError, error }}
            loadingText="Loading your employees..."
            data={data?.results}
            errorTitle="Failed to load employees"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.results?.map((emp) => (
                    <tr
                      key={emp.id}
                      className="hover:bg-gray-50"
                      onClick={() => handleEmployeeId(emp.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {emp.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {emp.first_name + " " + emp.last_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{emp.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {emp?.employee_profile?.department || "Not specified"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {emp?.employee_profile?.is_verified ? (
                          // Verified Badge
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg
                              className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            Verified
                          </span>
                        ) : (
                          // Not Verified Badge
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <svg
                              className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            Not Verified
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </QueryStatus>

          {/* Modals */}
          {isCreateOpen && (
            <CreateEmployeeModal
              isOpen={isCreateOpen}
              onClose={() => navigate("/admin/employees")}
            />
          )}

          {isEditOpen && (
            <EditEmployeeModal
              isOpen={isEditOpen}
              onClose={() => {
                navigate("/admin/employees");
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

export default EmployeeManagement;
