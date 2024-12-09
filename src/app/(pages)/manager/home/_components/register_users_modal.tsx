import React, { useState } from 'react';
import ButtonCustom from '@/app/_components/button_custom';
import { EmailOutlined, PersonOutlineOutlined, AssignmentIndOutlined } from '@mui/icons-material';
import TextInput from '@/app/_components/text_input';
import SelectInput from '@/app/_components/select_input';
import { ModalProps } from '@/app/types/ModalProps';
import { motion } from 'framer-motion';

const RegisterUserModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [, setError] = useState('');
    const [animationState, setAnimationState] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const roles = [
        { value: 'cleaning staff', label: 'Personal de Limpieza' },
        { value: 'recepcionist', label: 'Recepcionista' },
    ];

    if (!isOpen) return null;

    const handleClose = () => {
        setUserName('');
        setUserEmail('');
        setUserRole('');
        setEmailError('');
        setError('');
        setAnimationState({ type: null, message: '' });
        onClose();
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setUserEmail(email);
        setEmailError(isValidEmail(email) ? '' : 'Correo electrónico inválido');
    };

    const handleConfirm = async () => {
        setError('');
        if (!isButtonEnabled) return;

        setLoading(true);
        const password =
            userRole === 'cleaning staff'
                ? 'maid1234'
                : userRole === 'recepcionist'
                    ? 'recep123'
                    : '';

        const endpoint =
            userRole === 'cleaning staff'
                ? '/Maid'
                : userRole === 'recepcionist'
                    ? '/Receptionist'
                    : '';
    };

    const isButtonEnabled = userName.trim() !== '' && isValidEmail(userEmail) && userRole.trim() !== '';

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl text-primary font-bold mb-4">Registrar Usuario</h2>
                <TextInput
                    label="Nombre(s)"
                    iconLeft={<PersonOutlineOutlined />}
                    placeholder="Nombre(s)"
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextInput
                    label="Correo Electrónico"
                    iconLeft={<EmailOutlined />}
                    placeholder="Correo Electrónico"
                    type="email"
                    onChange={handleEmailChange}
                    error={emailError}
                />
                <SelectInput
                    label="Rol"
                    iconLeft={<AssignmentIndOutlined />}
                    onChange={(e) => setUserRole(e.target.value)}
                    value={userRole}
                    options={roles}
                    placeholder="Selecciona un rol"
                />
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
                        onClick={handleClose}
                    >
                        Cancelar
                    </ButtonCustom>
                    <ButtonCustom
                        variant="filled"
                        colorText="background"
                        backgroundColor="primary"
                        onClick={handleConfirm}
                        disabled={!isButtonEnabled || loading}
                        className={`w-full ${!isButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Registrando...' : 'Registrar'}
                    </ButtonCustom>
                </div>
            </div>
        </div>
    );
};

export default RegisterUserModal;
