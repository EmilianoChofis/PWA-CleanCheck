"use client";
import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";
import { HomeOutlined, ReportProblemOutlined } from "@mui/icons-material";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth > 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <SessionProvider>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex flex-col md:flex-row min-h-screen">
                <div
                    className={`sidebar bg-gray-100 p-4 md:w-auto lg:w-auto xl:w-auto 2xl:w-auto ${isSidebarOpen ? "block" : "hidden"} md:block h-[calc(100vh-4rem)] fixed md:relative top-16`}
                >
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
                </div>
                <main className="flex-1 mt-16 p-4 ml-0">{children}</main>
            </div>
        </SessionProvider>
    );
}