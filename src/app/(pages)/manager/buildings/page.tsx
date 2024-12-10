"use client";
import { useState, useEffect } from "react";
import Title from "@/app/_components/title";
import Searchbar from "../../_components/searchbar";
import CategoryButton from "../../_components/category_button";
import BuildingManagerTable from "../../_components/building_manager_table";
import ButtonCustom from "@/app/_components/button_custom";
import RegisterBuildingModal from "../home/_components/register_building_modal";
import { getBuildingsBuildingApi,getBuildingsActive,getBuildingsInactive } from "@/app/utils/building-service";
import { BuildingDashboard } from "@/app/types/BuildingDashboard";

export default function RecepcionistHome() {
    const [buildings, setBuildings] = useState<BuildingDashboard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState([
        { label: "Todas", value: "all", active: true },
        { label: "Activas", value: "active", active: false },
        { label: "Inactivas", value: "disabled", active: false },
      ]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchBuildings = async (clickedCategory: string) => {
        try {
            setIsLoading(true);
            const response = clickedCategory==null || clickedCategory==="all"? await getBuildingsBuildingApi()
                : clickedCategory==="active"? await getBuildingsActive()
                : await getBuildingsInactive();
                console.log("response data", response.data);
            setBuildings(response.data);
        } catch (error) {
            //setError("Hubo un error al cargar la lista de edificios.");
            //console.error("Error fetching buildings:", error);
            setBuildings([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBuildings("all");
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleConfirm = () => closeModal();

    const handleCategoryClick = (clickedCategory: string) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) => ({
              ...category,
              active: category.value === clickedCategory,
            }))
        );        
        console.log("categories", categories);
        setSelectedCategory(clickedCategory);
        fetchBuildings(clickedCategory);
    };

    return (
        <div className="grid grid-rows-[auto_1fr_auto] p-8 pb-20 gap-16 w-full">
            <main className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <Title className="text-2xl text-primary" title="Lista de edificios" />
                    <ButtonCustom
                        variant="filled"
                        colorText="background"
                        backgroundColor="primary"
                        onClick={openModal}
                        className="px-8 py-3 text-lg"
                    >
                        Registrar edificio
                    </ButtonCustom>
                </div>
                <div className="py-2">
                    <Searchbar label="Buscar incidencia" onChange={() => {}} />
                    <CategoryButton
                        categories={categories}
                        onCategoryClick={handleCategoryClick}
                    />
                </div>
                <div className="w-full">
                    {error && <p className="text-red-500">{error}</p>}
                    {isLoading ? (
                        <p className="text-center">Cargando edificios...</p>
                    ) : (
                        <BuildingManagerTable buildings={buildings} fetchBuildings={fetchBuildings} clickedCategory={selectedCategory}
/>
                    )}
                </div>
            </main>
            <RegisterBuildingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
            />
        </div>
    );
}
