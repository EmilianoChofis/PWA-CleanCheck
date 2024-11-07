"use client";
import SidebarItem from "./sidebar_item";
import {
  HomeOutlined,
  ReportProblemOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";

const Sidebar = () => {
  const menuItems = [
    {
      label: "Inicio",
      path: "/inicio",
      icon: <HomeOutlined className="text-primary" />,
      active: true,
      onClick: () => {
        console.log("Inicio");
      },
    },
    {
      label: "Incidencias",
      path: "/incidencias",
      icon: <ReportProblemOutlined className="text-primary" />,
      active: false,
      onClick: () => {
        console.log("Incidencias");
      },
    },
    {
      label: "Perfil",
      path: "/profile",
      icon: <PersonOutlineOutlined className="text-primary" />,
      active: false,
      onClick: () => {
        console.log("Perfil");
      },
    },
  ];

  return (
    <aside className="sidebar fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-gray-100 p-4 font-[family-name:var(--font-jost-medium)] z-10">
      <h6 className="mb-4">
        Hola Furro,
        <p className="font-[family-name:var(--font-jost-bold)]">
          ¿Qué quieres hacer hoy?
        </p>
      </h6>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
