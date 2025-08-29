
import AdminTopNavigation from "../components/dashboard/admin/AdminTopNavigation";
import { Outlet } from "react-router-dom";


const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopNavigation />
      <main className="pt-20 pb-10">
        <Outlet />
      </main>

    </div>
  );
};
export default AdminDashboard;