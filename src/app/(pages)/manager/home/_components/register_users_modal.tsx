import React, { useState } from 'react';
import ButtonCustom from '@/app/_components/button_custom';
import { EmailOutlined, PersonOutlineOutlined, AssignmentIndOutlined, LockOutlined, VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import TextInput from '@/app/_components/text_input';
import SelectInput from '@/app/_components/select_input';
import { ModalProps } from '@/app/types/ModalProps';
import { motion } from 'framer-motion';
import { registerUser } from '@/app/utils/auth-service';


const RegisterUserModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [emailError, setEmailError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [animationState, setAnimationState] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: '',
    });

    const roles = [
        { value: 'cleaning staff', label: 'Personal de Limpieza' },
        { value: 'recepcionist', label: 'Recepcionista' },
    ];

    if (!isOpen) return null;

    const handleClose = () => {
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        setUserRole('');
        setEmailError('');
        setUserNameError('');
        setAnimationState({ type: null, message: '' });
        onClose();
    };

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setUserEmail(email);
        setEmailError(isValidEmail(email) ? '' : 'Correo electrónico inválido');
    };
    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setUserName(name);
        setUserNameError(/^[a-zA-ZÀ-ÿ\s]+$/.test(name) ? '' : 'Solo letras');
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirm = async () => {
        if (!userName || !isValidEmail(userEmail) || !userRole || !userPassword.trim()) return;

        setLoading(true);
        const roleEndpoint = userRole === 'cleaning staff' ? '/Maid' : '/Receptionist';

        try {
            await registerUser(userName, userEmail, userRole, userPassword, roleEndpoint);

            setAnimationState({ type: 'success', message: 'Usuario registrado exitosamente!' });
            setTimeout(() => {
                onConfirm();
                handleClose();
            }, 1500);
        } catch {
            setAnimationState({
                type: 'error',
                message: 'Error al registrar el usuario. Intenta de nuevo.',
            });
            setTimeout(() => setAnimationState({ type: null, message: '' }), 3000);
        } finally {
            setLoading(false);
        }
    };

    const isButtonEnabled =
    userName.trim() !== '' &&
    !userNameError &&
    isValidEmail(userEmail) &&
    userRole.trim() !== '' &&
    userPassword.trim() !== '';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl text-primary font-bold mb-4">Registrar Usuario</h2>
                <TextInput
                    label="Nombre(s)"
                    iconLeft={<PersonOutlineOutlined />}
                    placeholder="Nombre(s)"
                    type="text"
                    onChange={handleUserNameChange}
                    error={userNameError}
                />
                <TextInput
                    label="Correo Electrónico"
                    iconLeft={<EmailOutlined />}
                    placeholder="Correo Electrónico"
                    type="email"
                    onChange={handleEmailChange}
                    error={emailError}
                />
                <TextInput
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    iconLeft={<LockOutlined />}
                    iconRight={
                        showPassword ? (
                            <VisibilityOutlined onClick={handlePasswordVisibility} />
                        ) : (
                            <VisibilityOffOutlined onClick={handlePasswordVisibility} />
                        )
                    }
                    placeholder="••••••••••••••"
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                <SelectInput
                    label="Rol"
                    iconLeft={<AssignmentIndOutlined />}
                    onChange={(e) => setUserRole(e.target.value)}
                    value={userRole}
                    options={roles}
                    placeholder="Selecciona un rol"
                />
                {animationState.type && (
                    <motion.div
                        className={`p-2 rounded ${
                            animationState.type === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {animationState.message}
                    </motion.div>
                )}
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
