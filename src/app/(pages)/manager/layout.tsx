import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";
import {
    HomeOutlined,
    ReportProblemOutlined,
    PersonOutlineOutlined,
    BusinessOutlined,
    PeopleOutlineOutlined,
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
                            path: "/manager/home",
                            icon: <HomeOutlined className="text-primary" />,
                        },
                        {
                            label: "Edificios",
                            path: "/manager/buildings",
                            icon: <BusinessOutlined className="text-primary" />,
                        },
                        {
                            label: "Usuarios",
                            path: "/manager/users",
                            icon: <PeopleOutlineOutlined className="text-primary" />,
                        },
                        {
                            label: "Incidencias",
                            path: "/manager/incidences",
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
