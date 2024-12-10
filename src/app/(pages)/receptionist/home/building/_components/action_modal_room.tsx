"use client";
import ButtonCustom from "@/app/_components/button_custom";
import React, { useState } from "react";
import { Business } from "@mui/icons-material";
import { changeStatusRoom } from "@/app/utils/building-service";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    buildingName: string;
    roomNumber: string | number;
    status: string;
    roomId: string;
}

const ActionModalRoom = ({
    isOpen,
    onClose,
    buildingName,
    roomNumber,
    status,
    roomId,
}: ModalProps) => {

    const router = useRouter(); // Mover la declaración aquí
    const isOccupied = status === "OCCUPIED";
    const [animationState, setAnimationState] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' }); // Mover la declaración aquí

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    };


    const handleConfirm = async () => {
        const newStatus = isOccupied ? "UNOCCUPIED" : "OCCUPIED";
        try {
            await changeStatusRoom(roomId, newStatus);
            setAnimationState({ type: 'success', message: '¡Operación exitosa!' });
            setTimeout(() => {
                onClose();
                setAnimationState({ type: null, message: '' });
                router.push('/receptionist/home');
            }, 1500);
        } catch (error) {
            console.error("Error al cambiar el estado de la habitación:", error);
            setAnimationState({ type: 'error', message: 'Error al realizar la operación. Intenta de nuevo.' });
            setTimeout(() => {
                setAnimationState({ type: null, message: '' });
                router.push('/receptionist/home');
            }, 3000);
        }
    };

    if (!isOpen) return null; 

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            variants={containerVariants}
            exit="hidden"
        >
            <motion.div className="bg-white rounded-lg shadow-lg p-6 w-96" variants={containerVariants}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {isOccupied ? "Marcar Salida" : "Marcar Entrada"}
                </h2>

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
                    {isOccupied
                        ? `La habitación ${roomNumber} estará disponible para rentarse nuevamente. ¿Deseas continuar?`
                        : `La habitación ${roomNumber} será ocupada. ¿Deseas continuar?`}
                </p>

                <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate={animationState.type ? "visible" : "hidden"}
                    style={{ marginBottom: '1rem' }}
                >
                    {animationState.type === 'success' && (
                        <div className="bg-green-200 text-green-700 p-2 rounded">
                            {animationState.message}
                        </div>
                    )}
                    {animationState.type === 'error' && (
                        <div className="bg-red-200 text-red-700 p-2 rounded">
                            {animationState.message}
                        </div>
                    )}
                </motion.div>

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
                        onClick={handleConfirm}
                    >
                        {isOccupied ? "Marcar Salida" : "Marcar Entrada"}
                    </ButtonCustom>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ActionModalRoom;