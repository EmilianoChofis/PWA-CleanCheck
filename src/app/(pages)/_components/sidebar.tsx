"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SidebarItem from "./sidebar_item";
import { useSession } from "next-auth/react";
import { SidebarMenuItemsProps } from "@/app/types/SidebarMenuItemsProps";

const Sidebar = ({ menuItems }: { menuItems: SidebarMenuItemsProps[] }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number, path: string) => {
    setActiveIndex(index);
    router.push(path);
  };

  return (
    <aside className="h-full overflow-y-auto p-4 font-[family-name:var(--font-jost-medium)]">
      <h6 className="mb-4">
        Hola {session?.user.name},
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
