import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "32px", minWidth: 0 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;