import { SearchbarProps } from "@/app/types/SearchbarProps";
import { MenuOutlined, SearchOutlined } from "@mui/icons-material";
import React from "react";

const Searchbar = ({ onChange }: SearchbarProps) => {
  return (
    <div className="mb-4">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-primary">
          <span className="icon">
            <MenuOutlined />
          </span>
        </div>
        <input
          type="text"
          onChange={onChange}
          placeholder="Buscar..."
          className={
            "w-full py-2 px-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        />
        <div className="absolute right-3 cursor-pointer text-primary">
          <span className="icon">
            <SearchOutlined />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
