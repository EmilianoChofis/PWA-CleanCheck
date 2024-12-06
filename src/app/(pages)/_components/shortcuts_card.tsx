"use client";
import { useState, useEffect } from "react";
import { Shortcuts } from "@/app/types/Shortcuts";
import ActionModal from "../receptionist/home/_components/action_modal";
import { getBuildings } from "@/app/utils/building-service";

const ShortcutsCard = ({ action, icon: Icon }: Shortcuts) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchBuildingsData = async () => {
            try {
                const response = await getBuildings();
                setBuildings(response.data);
                console.log("Edificios obtenidos:", response.data);
            } catch (error) {
                setError(error);
                console.error("Error al obtener edificios:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBuildingsData();
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const getModalContent = () => {
        let title = "";
        let description = "";

        if (action === "Marcar Entrada") {
            title = "Marcar Entrada";
            description = "Selecciona el edificio deseado para ver las habitaciones disponibles y marcar una entrada.";
        } else if (action === "Marcar Salida") {
            title = "Marcar Salida";
            description = "Selecciona el edificio para marcar la salida de una habitación.";
        } else if (action === "Habitaciones") {
            title = "Ver Habitaciones";
            description = "Accede a la lista de habitaciones disponibles.";
        }

        return { title, description };
    };

    const { title, description } = getModalContent();

    return (
        <>
            <button
                className="bg-gray-200 rounded-lg shadow-md p-4 min-w-[200px] flex flex-row items-center transition-transform hover:scale-105 focus:outline-none"
                onClick={handleOpenModal}
            >
                <div className="p-2 bg-white rounded-full">
                    <Icon className="text-primary" />
                </div>
                <div className="flex flex-col pl-4">
                    <h2 className="text-lg text-primary font-[family-name:var(--font-jost-medium)]">
                        {action}
                    </h2>
                </div>
            </button>
            <ActionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onContinue={handleCloseModal}
                title={title}
                description={description}
                buildings={buildings}
                loading={loading}
                error={error}
            />
        </>
    );
};

export default ShortcutsCard;
