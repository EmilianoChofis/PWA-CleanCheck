"use client";
import { Building } from "@/app/types/Building";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface BuildingContextProps {
  selectedBuilding: Building | null;
  setSelectedBuilding: React.Dispatch<React.SetStateAction<any | null>>;
}

const BuildingContext = createContext<BuildingContextProps | undefined>(
  undefined
);

export const BuildingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<any | null>(null);

  return (
    <BuildingContext.Provider value={{ selectedBuilding, setSelectedBuilding }}>
      {children}
    </BuildingContext.Provider>
  );
};

export const useBuildingContext = () => {
  const context = useContext(BuildingContext);
  if (!context) {
    throw new Error(
      "useBuildingContext debe usarse dentro de BuildingProvider"
    );
  }
  return context;
};
