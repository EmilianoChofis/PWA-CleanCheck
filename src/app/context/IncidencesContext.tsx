"use client";
import { Incidence } from "@/app/types/Incidence";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface IncidenceContextProps {
  selectedIncidence: Incidence | null;
  setSelectedIncidence: React.Dispatch<React.SetStateAction<Incidence | null>>;
}

const IncidenceContext = createContext<IncidenceContextProps | undefined>(
  undefined
);

export const IncidenceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIncidence, setSelectedIncidence] = useState<Incidence | null>(null);

  return (
    <IncidenceContext.Provider value={{ selectedIncidence, setSelectedIncidence }}>
      {children}
    </IncidenceContext.Provider>
  );
};

export const useIncidenceContext = () => {
  const context = useContext(IncidenceContext);
  if (!context) {
    throw new Error(
      "useIncidenceContext debe usarse dentro de IncidenceProvider"
    );
  }
  return context;
};
