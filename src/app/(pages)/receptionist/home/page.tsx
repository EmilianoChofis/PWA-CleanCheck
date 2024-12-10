"use client";
import React, { useEffect, useState } from "react";
import BuildingTable from "../../_components/building_table";
import { getBuildings } from "@/app/utils/building-service";
import { useRouter } from "next/navigation";
import Shortcuts from "../../_components/shortcuts";
import BuildingCardList from "../../_components/building_card_list";
import { Building } from "@/app/types/Building";
import { useBuildingContext } from "@/app/context/BuildingContext";

export default function Home() {
  const { setSelectedBuilding } = useBuildingContext();
  const [buildings, setBuildings] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const fetchBuildings = async () => {
    try {
      const response = await getBuildings();
      setBuildings(response.data);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const router = useRouter();
  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    router.push(`/receptionist/home/building`);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] p-8 pb-20 gap-16 w-full font-[family-name:var(--font-jost-regular)]">
      <main className="container-fluid">
        <Shortcuts />
        <div>
          {isLargeScreen ? (
            <BuildingTable
              buildings={buildings}
              onClick={handleBuildingClick}
            />
          ) : (
            <BuildingCardList
              buildings={buildings}
              onClick={handleBuildingClick}
            />
          )}
        </div>
      </main>
    </div>
  );
}
