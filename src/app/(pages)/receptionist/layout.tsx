"use client";
import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";
import { HomeOutlined, ReportProblemOutlined } from "@mui/icons-material";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar
          menuItems={[
            {
              label: "Inicio",
              path: "/receptionist/home",
              icon: <HomeOutlined className="text-primary" />,
            },
            {
              label: "Incidencias",
              path: "/receptionist/incidences",
              icon: <ReportProblemOutlined className="text-primary" />,
            },
          ]}
        />
        <div className="flex flex-col w-full ml-64 mt-16">{children}</div>
      </div>
    </SessionProvider>
  );
}
