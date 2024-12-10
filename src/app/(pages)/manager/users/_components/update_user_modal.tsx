import React, { useState, useEffect } from 'react';
import ButtonCustom from '@/app/_components/button_custom';
import { EmailOutlined, PersonOutlineOutlined } from '@mui/icons-material';
import TextInput from '@/app/_components/text_input';
import { motion } from 'framer-motion';

interface UpdateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
    userEmail: string;
    userId: string;
    roleId: string;
    onConfirm: (userId: string, name: string, email: string, roleId: string) => void;
}

const UpdateUserModal = ({ isOpen, onClose, userName, userEmail, userId, roleId, onConfirm }: UpdateUserModalProps) => {
    const [updatedName, setUpdatedName] = useState(userName);
    const [updatedEmail, setUpdatedEmail] = useState(userEmail);
    const [emailError, setEmailError] = useState('');
    const [animationState, setAnimationState] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [initialName, setInitialName] = useState(userName); // Store initial name
    const [initialEmail, setInitialEmail] = useState(userEmail); // Store initial email

    useEffect(() => {
        setInitialName(userName); // Set initial values on mount
        setInitialEmail(userEmail);
    }, [userName, userEmail]);

    useEffect(() => {
        setUpdatedName(userName);
        setUpdatedEmail(userEmail);
    }, [userName, userEmail]);

    if (!isOpen) return null;

    const handleClose = () => {
        setAnimationState({ type: null, message: '' }); // Clear message before closing
        onClose();
    };

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setUpdatedEmail(email);
        setEmailError(isValidEmail(email) ? '' : 'Correo electrónico inválido');
    };

    const isButtonEnabled = (updatedName !== initialName || updatedEmail !== initialEmail) && isValidEmail(updatedEmail);

    const handleUpdate = async () => {
        if (isButtonEnabled) {
            try {
                await onConfirm(userId, updatedName, updatedEmail, roleId);
                setAnimationState({ type: 'success', message: 'Usuario actualizado exitosamente!' });
                setTimeout(() => {
                    setAnimationState({ type: null, message: '' });
                    handleClose();
                }, 1500);
            } catch (error) {
                console.error("Error updating user:", error);
                setAnimationState({ type: 'error', message: 'Error al actualizar el usuario. Intenta de nuevo.' });
                setTimeout(() => {
                    setAnimationState({ type: null, message: '' });
                }, 3000);
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
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
                <h2 className="text-xl text-primary font-bold mb-4">Actualizar Usuario</h2>

                <motion.div variants={inputVariants}>
                    <TextInput
                        label="Nombre(s)"
                        iconLeft={<PersonOutlineOutlined />}
                        placeholder="Nombre(s)"
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                </motion.div>

                <motion.div variants={inputVariants}>
                    <TextInput
                        label="Correo Electrónico"
                        iconLeft={<EmailOutlined />}
                        placeholder="Correo Electrónico"
                        type="email"
                        value={updatedEmail}
                        onChange={handleEmailChange}
                        error={emailError}
                    />
                </motion.div>

                {/* Success/Error Message Animation */}
                <motion.div
                    key={animationState.message} // Force re-render
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
                        onClick={handleClose}
                    >
                        Cancelar
                    </ButtonCustom>
                    <ButtonCustom
                        variant="filled"
                        colorText="background"
                        backgroundColor="primary"
                        onClick={handleUpdate}
                        disabled={!isButtonEnabled}
                        className={`w-full ${!isButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Actualizar
                    </ButtonCustom>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default UpdateUserModal;