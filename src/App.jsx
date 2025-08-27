import { Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "./components/auth/LoginForm";
import VerificationPending from "./pages/employee/VerificationPending";
import DashboardView from "./pages/employee/DashboardView";
import AssetsView from "./components/dashboard/employee/AssetView";
import ProfileView from "./components/dashboard/employee/ProfileView";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <LoginForm />
        </PublicRoute>
      }/>
      <Route path="/pending/" element={<VerificationPending />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardView />
          </ProtectedRoute>
        }
      >
          <Route index element={<Navigate to="assets" replace />} />
          <Route path="assets" element={<AssetsView />} />
          <Route path="profile" element={<ProfileView />} />

      </Route>
    </Routes>
  );
}

export default App;
