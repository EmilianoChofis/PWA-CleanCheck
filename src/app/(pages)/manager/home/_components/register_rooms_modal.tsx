import React, { useState, useEffect } from 'react';
import ButtonCustom from '@/app/_components/button_custom';
import { BusinessOutlined } from '@mui/icons-material';
import NumberInput from '@/app/_components/number_input';
import SelectInput from '@/app/_components/select_input';
import { ModalProps } from '@/app/types/ModalProps';
import { getBuildingsActive,createRoomsList } from '@/app/utils/building-service';
import { Building } from '@/app/types/Building';
import { Floor } from '@/app/types/Floor';
const RegisterRoomsModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
    const [buildingName, setBuildingName] = useState('');
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [buildingFloor, setBuildingFloor] = useState('');
    const [floors, setFloors] = useState<Floor[]>([]);
    const [numRooms, setNumRooms] = useState(0);
    const inputId = "numRoomsInput";
    
    const createRooms = async () => {
        try {
            const response = await createRoomsList(buildingFloor, numRooms);
            console.log("Response:", response);
            onConfirm();
        } catch (error) {
            console.error("Error creating rooms:", error);
        }
    }
    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await getBuildingsActive();
                setBuildings(response.data);
            } catch (error) {
                console.error("Error fetching buildings:", error);
                setBuildings([]);
            }
        };

        fetchBuildings();
    }, []);

    const buildingsUse = buildings.map((building) => ({
        value: building.id,
        label: building.name,
    }));

    const handleBuildingChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const selectedBuildingId = e.target.value as string;
        setBuildingName(selectedBuildingId);
        try {
            const selectedBuilding = buildings.find(building => building.id === selectedBuildingId);
            if (selectedBuilding) {
                setFloors(selectedBuilding.floors);
            } else {
                setFloors([]);
            }
        } catch (error) {
            console.error("Error fetching floors:", error);
            setFloors([]);
        }
    };

    const floorsUse = floors.map((floor) => ({
        value: floor.id,
        label: floor.name,
    }));

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl text-primary font-bold mb-4">Registrar Habitaciones</h2>
                <SelectInput
                    label="Edificio"
                    iconLeft={<BusinessOutlined />}
                    onChange={handleBuildingChange}
                    value={buildingName}
                    options={buildingsUse}
                    placeholder="Selecciona un edificio"
                />
                <SelectInput
                    label="Piso"
                    iconLeft={<BusinessOutlined />}
                    onChange={(e) => setBuildingFloor(e.target.value)}
                    value={buildingFloor}
                    options={floorsUse}
                    placeholder="Selecciona un piso"
                />
                <label htmlFor={inputId} className="block text-primary mb-1 font-medium">Número de habitaciones</label>
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
                        onClick={createRooms}
                        disabled={!isButtonEnabled}
                    >
                        Confirmar
                    </ButtonCustom>
                </div>
            </div>
        </div>
    );
};

export default RegisterRoomsModal;