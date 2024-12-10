import React, { useState } from 'react';
import ButtonCustom from '@/app/_components/button_custom';
import { BusinessOutlined } from '@mui/icons-material';
import NumberInput from '@/app/_components/number_input';
import SelectInput from '@/app/_components/select_input';
import { ModalProps } from '@/app/types/ModalProps';

const RegisterRoomsModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
    const [buildingName, setBuildingName] = useState('');
    const [buildingFloor, setBuildingFloor] = useState('');
    const [numRooms, setNumRooms] = useState(0);
    const inputId = "numRoomsInput";

    const buildings = [
        { value: 'building1', label: 'Building 1' },
        { value: 'building2', label: 'Building 2' },
    ];

    const floors = [
        { value: '1', label: 'Floor 1' },
        { value: '2', label: 'Floor 2' },
        { value: '3', label: 'Floor 3' },
    ];

    if (!isOpen) return null;

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(20, Number(e.target.value)));
        setNumRooms(value);
    };

    const handleNumberInputChange = (value: number) => {
        setNumRooms(Math.max(1, Math.min(20, value)));
    };

    const handleClose = () => {
        setBuildingName('');
        setBuildingFloor('');
        setNumRooms(0);
        onClose();
    };

    const isButtonEnabled = buildingName.trim() !== '' && buildingFloor.trim() !== '' && numRooms > 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl text-primary font-bold mb-4">Registrar Habitaciones</h2>
                <SelectInput
                    label="Edificio"
                    iconLeft={<BusinessOutlined />}
                    onChange={(e) => setBuildingName(e.target.value)}
                    value={buildingName}
                    options={buildings}
                    placeholder="Selecciona un edificio"
                />
                <SelectInput
                    label="Piso"
                    iconLeft={<BusinessOutlined />}
                    onChange={(e) => setBuildingFloor(e.target.value)}
                    value={buildingFloor}
                    options={floors}
                    placeholder="Selecciona un piso"
                />
                <label htmlFor={inputId} className="block text-primary mb-1 font-medium">Número de habitaciones</label>
                <div className="flex items-center mb-4">
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={numRooms}
                        onChange={handleNumberChange}
                        id={inputId}
                        className="flex-grow mr-4"
                    />
                    <span className="text-lg font-bold">{numRooms}</span>
                </div>
                <NumberInput
                    onChange={(e) => handleNumberInputChange(parseInt(e.target.value, 10) || 0)}
                    value={numRooms}
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

export default RegisterRoomsModal;