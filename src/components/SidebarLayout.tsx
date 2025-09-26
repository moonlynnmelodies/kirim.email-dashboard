import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const SidebarLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Sidebar selalu ada */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet /> {/* Konten halaman akan berubah sesuai route */}
      </main>
    </div>
  );
};

export default SidebarLayout;
