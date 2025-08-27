
import TopNavigation from '../../components/dashboard/employee/TopNavigation.jsx';
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <main className="pt-20 pb-10">

        <Outlet />
      </main>

    </div>
  );
};
export default Dashboard;