import React, { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  LayoutDashboard,
  FileSearch,
  BadgeCheck,
  FileCheck2,
  Users,
  ClipboardList,
  GraduationCap,
  Calculator,
} from "lucide-react";

// Tipe untuk konfigurasi menu
interface MenuConfigItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

interface MenuConfigs {
  [key: string]: MenuConfigItem[];
}

// Tipe untuk judul halaman
interface PageTitles {
  [key: string]: {
    [key: string]: string;
  };
}

// Props untuk komponen DashboardLayout
interface DashboardLayoutProps {
  role: string;
  userData: any; // Anda dapat mengganti `any` dengan tipe data user yang lebih spesifik
}

const menuConfigs: MenuConfigs = {
  mahasiswa: [
    {
      title: "Dashboard",
      path: "/mahasiswa",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Pengajuan",
      path: "/mahasiswa/pengajuan",
      icon: <FileSearch className="w-5 h-5" />,
    },
    {
      title: "Status",
      path: "/mahasiswa/status",
      icon: <BadgeCheck className="w-5 h-5" />,
    },
  ],
  koordinator: [
    {
      title: "Dashboard",
      path: "/koordinator",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Manajemen User",
      path: "/koordinator/manage-akun",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Validasi Dokumen",
      path: "/koordinator/validasi",
      icon: <FileSearch className="w-5 h-5" />,
    },
    {
      title: "Jadwal & Penilaian",
      path: "/koordinator/jadwal-dan-nilai",
      icon: <Calculator className="w-5 h-5" />,
    },
  ],
  dosen: [
    {
      title: "Dashboard",
      path: "/dosen",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Mahasiswa Bimbingan",
      path: "/dosen/mahasiswa-bimbingan",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      title: "Mahasiswa Seminar",
      path: "/dosen/mahasiswa-seminar",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: "Riwayat Bimbingan",
      path: "/dosen/riwayat",
      icon: <FileCheck2 className="w-5 h-5" />,
    },
  ],
};

const pageTitles: PageTitles = {
  mahasiswa: {
    "/mahasiswa": "Dashboard",
    "/mahasiswa/pengajuan": "Pengajuan",
    "/mahasiswa/status": "Status",
  },
  koordinator: {
    "/koordinator": "Dashboard",
    "/koordinator/manage-akun": "Manajemen User",
    "/koordinator/validasi": "Validasi Dokumen",
    "/koordinator/jadwal-dan-nilai": "Jadwal dan Nilai",
    "/koordinator/notifikasi": "Notifikasi",
  },
  dosen: {
    "/dosen": "Dashboard",
    "/dosen/mahasiswa-bimbingan": "Mahasiswa Bimbingan",
    "/dosen/mahasiswa-seminar": "Mahasiswa Seminar",
    "/dosen/riwayat": "Riwayat",
  },
  kaprodi: {
    "/kaprodi": "Dashboard",
    "/kaprodi/Mahasiswa": "Mahasiswa",
    "/kaprodi/riwayat": "Riwayat",
  },
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  role,
  userData,
}) => {
  if (!role || !menuConfigs[role]) {
    console.error("Invalid role provided to DashboardLayout:", role);
    return <Navigate to="/login" replace />;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getPageTitle = (): string => {
    const titles = pageTitles[role];
    return titles?.[location.pathname] || "SITRACK";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 relative">
      <Navbar title={getPageTitle()} onToggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          menuItems={menuConfigs[role]}
          userData={userData}
          role={role}
        />
        <div
          className={`transition-all duration-300 flex-1 ${
            isSidebarOpen ? "lg:ml-64" : "ml-0 lg:ml-20"
          }`}
        >
          <main className="p-8 mt-16">
            <Outlet />
          </main>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-gray-900/50 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
