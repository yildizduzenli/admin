import { Outlet, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import AppSidebar from "../components/AppSidebar.component";
import AppHeader from "../components/AppHeader.component";

export default function DashboardLayout({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />

      <div className="dashboard-content">
        <AppHeader />
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
