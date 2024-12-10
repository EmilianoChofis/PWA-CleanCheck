"use client";
import React, { useEffect, useState } from "react";
import BuildingTable from "../../_components/building_table";
import WorkZones from "../../_components/work_zones";
import { getBuildings } from "@/app/utils/building-service";
import { useRouter } from "next/navigation";
import { useBuildingContext } from "../../../context/BuildingContext";
import Title from "@/app/_components/title";
import { Building } from "@/app/types/Building";

export default function Home() {
  const { setSelectedBuilding } = useBuildingContext();
  const [buildings, setBuildings] = useState([]);

  const fetchBuildings = async () => {
    try {
      const response = await getBuildings();
      setBuildings(response.data);
    } catch (error) {
      throw new Error("Error al obtener los edificios: " + error);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const router = useRouter();
  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    router.push(`/maid/home/building`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] p-8 pb-20 gap-16 w-full font-[family-name:var(--font-jost-regular)]">
      <main className="container-fluid">
        <div className="flex flex-row justify-between items-center mb-3">
          <WorkZones />
        </div>
        <div className="py-2">
          <Title className="text-2xl text-primary" title="Lista de edificios" />
          <BuildingTable buildings={buildings} onClick={handleBuildingClick} />
        </div>
      </main>
    </div>
  );
}
