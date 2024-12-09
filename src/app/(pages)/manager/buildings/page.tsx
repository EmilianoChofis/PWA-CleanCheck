"use client";
import { useState, useEffect } from "react";
import Title from "@/app/_components/title";
import Searchbar from "../../_components/searchbar";
import CategoryButton from "../../_components/category_button";
import BuildingManagerTable from "../../_components/building_manager_table";
import ButtonCustom from "@/app/_components/button_custom";
import RegisterBuildingModal from "../home/_components/register_building_modal";
import { getBuildings } from "@/app/utils/building-service";
import { BuildingDashboard } from "@/app/types/BuildingDashboard";

export default function RecepcionistHome() {
    const [buildings, setBuildings] = useState<BuildingDashboard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState([
        { label: "Todos", value: "all", active: true },
        { label: "Activos", value: "active", active: false },
        { label: "Deshabilitados", value: "disabled", active: false },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchBuildings = async () => {
        try {
            setIsLoading(true);
            const response = await getBuildings();
            setBuildings(response.data);
        } catch (error) {
            setError("Hubo un error al cargar la lista de edificios.");
            console.error("Error fetching buildings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBuildings();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleConfirm = () => closeModal();

    const handleCategoryClick = (clickedCategory: string) => {
        setCategories(prevCategories =>
            prevCategories.map(category => ({
                ...category,
                active: category.label === clickedCategory,
            }))
        );
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
                        <BuildingManagerTable buildings={buildings} />
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
