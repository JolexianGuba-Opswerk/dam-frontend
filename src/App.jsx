import { Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "./components/auth/LoginForm";
import VerificationPending from "./pages/employee/VerificationPending";
import DashboardView from "./pages/employee/DashboardView";
import AssetsView from "./components/dashboard/employee/AssetView";
import ProfileView from "./components/dashboard/employee/ProfileView";

import ProtectedRoute from "./components/auth/ProtectedRoutes";
import AssetManagement from "./components/dashboard/admin/AssetManagement";
import AssetEdit from "./components/modal/admin/assets/EditAssetModal";
import AdminDashboard from "./pages/AdminDashboardView";
import { ToastContainer } from "react-toastify";
import EmployeeManager from "./components/dashboard/admin/EmployeeManagement";
import AssetHistory from "./components/dashboard/admin/AssetHistory";
import EmployeeManagement from "./components/dashboard/admin/EmployeeManagement";
import AdminProfileView from "./components/dashboard/admin/AdminProfileView";
import UnauthorizedPage from "./components/auth/UnAuthorizedPage";
import ForgotPasswordFlow from "./components/forgot-password-flow/ForgotPasswordFlow";

function App() {
  return (
    <>
      <Routes>
        // Public login route
        <Route path="/login" element={<LoginForm />} />
        <Route path="/unathorized" element={<UnauthorizedPage />} />
        <Route path="/forget-password" element={<ForgotPasswordFlow />} />
        // Admin Route
        <Route path="/pending" element={<VerificationPending />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="assets" replace />} />
          // Admin Asset Management Section
          <Route path="/admin/assets/" element={<AssetManagement />} />
          <Route path="/admin/assets/create" element={<AssetManagement />} />
          <Route path="/admin/assets/:id" element={<AssetManagement />} />
          <Route path="/admin/asset-history" element={<AssetHistory />} />
          // Admin Employee Management Section
          <Route path="/admin/employees" element={<EmployeeManagement />} />
          <Route
            path="/admin/employees/create"
            element={<EmployeeManagement />}
          />
          <Route path="/admin/employees/:id" element={<EmployeeManagement />} />
          <Route path="/admin/profile/" element={<AdminProfileView />} />
        </Route>
        // Employee Side Routes
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <DashboardView />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="assets" replace />} />
          <Route path="assets" element={<AssetsView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
