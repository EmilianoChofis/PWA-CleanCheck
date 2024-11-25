import ButtonCustom from "@/app/_components/button_custom";
import React from "react";
import { Business } from "@mui/icons-material";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    buildingName: string;
    roomNumber: string;
}

const ActionModalRoom = ({
    isOpen,
    onClose,
    onConfirm,
    buildingName,
    roomNumber,
}: ModalProps) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Marcar salida</h2>

                <div className="flex items-center mb-4">
                    <div className="bg-slate-600 rounded-full p-2 mr-4">
                        <Business style={{ color: 'white' }} />
                    </div>
                    <div>
                        <p className="text-gray-700 font-medium">{buildingName}</p>
                        <p className="text-gray-600">Habitación: <span className="font-bold">{roomNumber}</span></p>
                    </div>
                </div>

                <p className="text-gray-700 mb-6">
                    La habitación {roomNumber} estará disponible para rentarse nuevamente. ¿Deseas continuar?
                </p>

                <div className="flex justify-end gap-4">
                    <ButtonCustom
                        onClick={onClose}
                        colorText="complementary"
                        variant="outlined"
                        borderColor="disabled"
                    >
                        Cancelar
                    </ButtonCustom>

                    <ButtonCustom
                        variant="filled"
                        colorText="background"
                        backgroundColor="primary"
                        onClick={onConfirm}
                    >
                        Marcar salida
                    </ButtonCustom>
                </div>
            </div>
        </div>
    );
};

export default ActionModalRoom;