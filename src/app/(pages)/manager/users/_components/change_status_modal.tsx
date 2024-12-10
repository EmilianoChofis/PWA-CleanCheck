import React, { useState } from 'react';
import ButtonCustom from '@/app/_components/button_custom';
import { motion } from 'framer-motion';

interface ActivateDeactivateModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    userName: string;
    currentStatus: 'active' | 'inactive';
    onConfirm: (userId: string, newStatus: 'active' | 'inactive') => void;
}

const ActivateDeactivateModal = ({ isOpen, onClose, userId, userName, currentStatus, onConfirm }: ActivateDeactivateModalProps) => {
    const [animationState, setAnimationState] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    };

    if (!isOpen) return null;

    const actionText = currentStatus === 'active' ? 'Desactivar' : 'Activar';
    const modalTitle = currentStatus === 'active' ? 'Desactivar Usuario' : 'Activar Usuario';
    const confirmationMessage = currentStatus === 'active'
        ? `¿Está seguro que desea desactivar a ${userName}?`
        : `¿Está seguro que desea activar a ${userName}?`;

    const handleConfirm = async () => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await onConfirm(userId, newStatus);
            setAnimationState({ type: 'success', message: `¡Usuario ${newStatus === 'active' ? 'activado' : 'desactivado'} exitosamente!` });

            setTimeout(() => {
                setAnimationState({ type: null, message: '' });
                onClose();
            }, 1500);

        } catch (error) {
            console.error("Error al cambiar el estado del usuario:", error);

            setAnimationState({ type: 'error', message: 'Error al realizar la operación. Intenta de nuevo.' });

            setTimeout(() => {
                setAnimationState({ type: null, message: '' });
            }, 3000);
        }
    };


    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            variants={containerVariants}
            exit="hidden"
        >
            <motion.div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md" variants={containerVariants}>
                <h2 className="text-xl text-primary font-bold mb-4">{modalTitle}</h2>
                <p className="mb-4">{confirmationMessage}</p>

                <motion.div
                    key={animationState.message}
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

                <div className="flex justify-center gap-4 mt-6">
                    <ButtonCustom
                        colorText="complementary"
                        variant="outlined"
                        borderColor="disabled"
                        onClick={onClose}
                    >
                        Cancelar
                    </ButtonCustom>
                    <ButtonCustom
                        variant="filled"
                        colorText="background"
                        backgroundColor={currentStatus === 'active' ? 'error' : 'success'}
                        onClick={handleConfirm}
                    >
                        {actionText}
                    </ButtonCustom>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ActivateDeactivateModal;
