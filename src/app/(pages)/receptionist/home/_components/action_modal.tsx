"use client";
import ButtonCustom from "@/app/_components/button_custom";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBuildingContext } from "../BuildingContext"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;
    title: string;
    description: string;
    buildings: any[];
    loading: boolean;
    error: unknown;
}

const ActionModal = ({
    isOpen,
    onClose,
    title,
    description,
    buildings,
}: ModalProps) => {
    const { setSelectedBuilding } = useBuildingContext();
    const [selectedBuildingName, setSelectedBuildingName] = useState<string | null>(null);
    const router = useRouter();

    const handleBuildingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBuildingName(event.target.value);
    };

    const handleClose = () => {
        setSelectedBuildingName(null);
        onClose();
    };

    const handleContinue = () => {
        if (selectedBuildingName) {
            const buildingObject = buildings.find(
                (building) =>
                    building.building?.name.toLowerCase().trim() ===
                    selectedBuildingName.toLowerCase().trim()
            );
    
            if (buildingObject) {
                setSelectedBuilding(buildingObject.building);
                router.push("/receptionist/home/building");
            } else {
                console.error("Edificio no encontrado.");
            }
        }
    };
    

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl text-primary font-[family-name:var(--font-jost-bold)] mb-4">
                    {title}
                </h2>
                <p className="text-primary mb-4">{description}</p>
                <div className="mb-4">
                    <label htmlFor="building-select" className="block text-primary mb-2">Selecciona un edificio:</label>
                    <select
                        id="building-select"
                        value={selectedBuildingName ?? ""}
                        onChange={handleBuildingChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">-- Selecciona un edificio --</option>
                        {buildings.map((building, index) => (
                            <option key={index} value={building?.building?.name || ''}>
                                {building?.building?.name || ''}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end gap-4 px-5">
                    <ButtonCustom
                        colorText="complementary"
                        variant="outlined"
                        borderColor="disabled"
                        onClick={handleClose}
                    >
                        Cancelar
                    </ButtonCustom>
                    <ButtonCustom
                        className={`w-full ${!selectedBuildingName ? 'opacity-50 cursor-not-allowed' : ''}`}
                        variant="filled"
                        colorText="background"
                        backgroundColor="primary"
                        onClick={handleContinue}
                        disabled={!selectedBuildingName}
                    >
                        Continuar
                    </ButtonCustom>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;
