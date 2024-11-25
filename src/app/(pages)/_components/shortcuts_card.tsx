"use client";

import { useState } from "react";
import { Shortcuts } from "@/app/types/Shortcuts";
import ActionModal from "../recepcionist/_components/action_modal";

const ShortcutsCard = ({ action, icon: Icon }: Shortcuts) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAction = () => {
        let title = "";
        let description = "";
        let buildings = ["Edificio 1", "Edificio 2", "Edificio 3"];
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

        return (
            <ActionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onContinue={handleCloseModal}
                title={title}
                description={description}
                buildings={buildings}
            />
        );
    };

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
            {handleAction()}
        </>
    );
};

export default ShortcutsCard;
