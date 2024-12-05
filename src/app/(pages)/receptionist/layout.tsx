import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";
import {
    HomeOutlined,
    ReportProblemOutlined,
    PersonOutlineOutlined,
} from "@mui/icons-material";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                        {
                            label: "Perfil",
                            path: "/receptionist/profile",
                            icon: <PersonOutlineOutlined className="text-primary" />,
                        },
                    ]}
                />
                <div className="flex flex-col w-full ml-64 mt-16">{children}</div>
            </div>
        </SessionProvider>
    );
}
