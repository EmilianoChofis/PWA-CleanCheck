import React, { useState } from 'react';
import ButtonCustom from '@/app/_components/button_custom';
import { BusinessOutlined } from '@mui/icons-material';
import TextInput from "@/app/_components/text_input";
import NumberInput from '@/app/_components/number_input';
import { ModalProps } from '@/app/types/ModalProps';

const RegisterBuildingModal = ({
    isOpen,
    onClose,
    onConfirm,
}: ModalProps) => {
    const [buildingName, setBuildingName] = useState('');
    const [floors, setFloors] = useState(0);
    const inputId = "floorsInput";


    if (!isOpen) return null;

    const handleFloorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(20, Number(e.target.value)));
        setFloors(value);
    };

    const handleNumberInputChange = (value: number) => {
        setFloors(Math.max(1, Math.min(20, value)));
    };

    const handleClose = () => {
        setBuildingName('');
        setFloors(0);
        onClose();
    };

    const isButtonEnabled = buildingName.trim() !== '' && floors > 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl text-primary font-bold mb-4">
                    Registrar edificio
                </h2>
                <TextInput
                    label="Nombre del edificio"
                    iconLeft={<BusinessOutlined />}
                    placeholder="Nombre del edificio"
                    type="text"
                    onChange={(e) => setBuildingName(e.target.value)}
                />
                <label htmlFor={inputId} className="block text-primary mb-1 font-medium">Número de pisos</label>
                <div className="flex items-center mb-4">
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={floors}
                        onChange={handleFloorChange}
                        id={inputId}
                        className="flex-grow mr-4"
                    />
                    <span className="text-lg font-bold">{floors}</span>
                </div>
                <NumberInput
                    onChange={(e) => handleNumberInputChange(parseInt(e.target.value, 10) || 0)}
                    value={floors}
                    iconLeft={<BusinessOutlined />}
                    placeholder="Ingresa un número"
                />
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
                        onClick={onConfirm}
                        disabled={!isButtonEnabled}
                        className={`w-full ${!isButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Registrar
                    </ButtonCustom>
                </div>
            </div>
        </div>
    );
};

export default RegisterBuildingModal;