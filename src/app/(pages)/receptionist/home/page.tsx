"use client";
import React, { useEffect, useState } from "react";
import BuildingTable from "../../_components/building_table";
import { getBuildings } from "@/app/utils/building-service";
import { useRouter } from "next/navigation";
import { useBuildingContext } from "./BuildingContext";
import Shortcuts from "../../_components/shortcuts";
import BuildingCardList from "../../_components/building_card_list";

export default function Home() {
    const { setSelectedBuilding } = useBuildingContext();
    const [buildings, setBuildings] = useState([]);

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
    const handleBuildingClick = (building: any) => {
        setSelectedBuilding(building);
        router.push(`/receptionist/home/building`);
    };

    const isLargeScreen = window.innerWidth > 768;

    return (
        <div>
            <Shortcuts />
            <div>
                {isLargeScreen ? (
                    <BuildingTable buildings={buildings} onClick={handleBuildingClick} />
                ) : (
                    <BuildingCardList buildings={buildings} onClick={handleBuildingClick} />
                )}
            </div>
        </div>
    );
}