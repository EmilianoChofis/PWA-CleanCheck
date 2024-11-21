"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SidebarItem from "./sidebar_item";
import {
  HomeOutlined,
  ReportProblemOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";

const Sidebar = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number, path: string) => {
    setActiveIndex(index);
    router.push(path);
  };

  const menuItems = [
    {
      label: "Inicio",
      path: "/home",
      icon: <HomeOutlined className="text-primary" />,
    },
    {
      label: "Incidencias",
      path: "/incidences",
      icon: <ReportProblemOutlined className="text-primary" />,
    },
    {
      label: "Perfil",
      path: "/profile",
      icon: <PersonOutlineOutlined className="text-primary" />,
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
              active={index === activeIndex}
              onClick={() => handleItemClick(index, item.path)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
