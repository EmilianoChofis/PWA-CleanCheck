import ButtonCustom from "@/app/_components/button_custom";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;
    title: string;
    description: string;
    buildings: string[];
}

const ActionModal = ({
    isOpen,
    onClose,
    onContinue,
    title,
    description,
    buildings,
}: ModalProps) => {
    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
    const router = useRouter();

    const handleBuildingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBuilding(event.target.value);
    };

    const handleClose = () => {
        setSelectedBuilding(null);
        onClose();
    };

    const handleContinue = () => {
        if (selectedBuilding) {
            router.push(`/recepcionist/building/`);
            onContinue();
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
                    <label className="block text-primary mb-2">Selecciona un edificio:</label>
                    <select
                        value={selectedBuilding || ""}
                        onChange={handleBuildingChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">-- Elige un edificio --</option>
                        {buildings.map((building, index) => (
                            <option key={index} value={building}>
                                {building}
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
                        className={`w-full ${!selectedBuilding ? 'opacity-50 cursor-not-allowed' : ''}`}
                        variant="filled"
                        colorText="background"
                        backgroundColor="primary"
                        onClick={handleContinue}
                        disabled={!selectedBuilding}
                    >
                        Continuar
                    </ButtonCustom>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;