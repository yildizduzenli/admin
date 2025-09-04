import { Navigate, Outlet } from "react-router";
import AppSidebar from "../components/AppSidebar.component";
import AppHeader from "../components/AppHeader.component";
import AppScreenLoading from "../components/AppScreenLoading.component";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />

      <div className="dashboard-content">
        <AppHeader />
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
