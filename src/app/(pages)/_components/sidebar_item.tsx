import { SidebarItemProps } from "@/app/types/SidebarItemProps";

export interface MenuItem extends Omit<SidebarItemProps, "onClick" | "active"> {
  path: string;
}

const SidebarItem = ({ label, icon, active, onClick }: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center p-3 mb-1 cursor-pointer rounded-full transition ${
        active ? "bg-gray-200 text-gray-800" : "text-gray-500 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="mr-2">{icon}</div>
      <span className="font-medium text-primary">{label}</span>
    </div>
  );
};

export default SidebarItem;
