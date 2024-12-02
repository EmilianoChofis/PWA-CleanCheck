import React from 'react';
import { ApartmentOutlined, DeleteOutlineOutlined, EditOutlined, RestoreFromTrashOutlined } from '@mui/icons-material';
import Link from 'next/link';

const buildingData = [
    {
        id: 1,
        name: "Edificio Alta Palmira",
        reportedRooms: 5,
        disabledRooms: 6,
        totalRooms: 11,
        active: true,
    },
    {
        id: 2,
        name: "Edificio Alta Palmira",
        reportedRooms: 5,
        disabledRooms: 6,
        totalRooms: 11,
        active: true,
    },
    {
        id: 3,
        name: "Edificio Alta Palmira",
        reportedRooms: 5,
        disabledRooms: 6,
        totalRooms: 11,
        active: false,
    },
    {
        id: 4,
        name: "Edificio Alta Palmira",
        reportedRooms: 5,
        disabledRooms: 6,
        totalRooms: 11,
        active: false,
    },
    {
        id: 5,
        name: "Edificio Alta Palmira",
        reportedRooms: 5,
        disabledRooms: 6,
        totalRooms: 11,
        active: true,
    },
    {
        id: 6,
        name: "Edificio Alta Palmira",
        reportedRooms: 5,
        disabledRooms: 6,
        totalRooms: 11,
        active: false,
    },
];

const BuildingManagerTable = () => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100 text-left text-sm border-b border-gray-200 font-bold">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Edificio</th>
                    <th className="py-3 px-4">Habitaciones Reportadas</th>
                    <th className="py-3 px-4">Habitaciones Deshabilitadas</th>
                    <th className="py-3 px-4">Total de habitaciones</th>
                    <th className="py-3 px-4">Acciones</th>
                    <th className="py-3 px-4">Estado</th>
                </tr>
            </thead>
            <tbody>
                {buildingData.map((building, index) => (
                    <tr key={building.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4 flex items-center gap-2 text-primary font-[family-name:var(--font-jost-medium)]">
                            <button className="p-2 bg-complementary rounded-full">
                                <ApartmentOutlined className="text-background" />
                            </button>
                            <Link href={`/manager/buildings/rooms`} className="hover:underline">
                                {building.name}
                            </Link>
                        </td>
                        <td className="py-3 px-4 text-orange-500 text-center">{building.reportedRooms}</td>
                        <td className="py-3 px-4 text-error text-center">{building.disabledRooms}</td>
                        <td className="py-3 px-4 text-center">{building.totalRooms}</td>
                        <td className="py-3 px-4 flex gap-2">
                            {building.active && (
                                <>
                                    <button className="p-2 border-2 border-primary rounded-full" aria-label={`Editar usuario ${building.name}`}>
                                        <EditOutlined className="text-primary" />
                                    </button>
                                    <button className="p-2 border-2 border-error rounded-full" aria-label={`Eliminar usuario ${building.name}`}>
                                        <DeleteOutlineOutlined className="text-error" />
                                    </button>
                                </>
                            )}
                            {!building.active && (
                                <button className="p-2 border-2 border-secondary rounded-full" aria-label={`Restaurar usuario ${building.name}`}>
                                    <RestoreFromTrashOutlined className="text-secondary" />
                                </button>
                            )}
                        </td>
                        <td className="py-3 px-4">
                            <button className={`py-1 px-4 rounded-lg ${building.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {building.active ? 'Activo' : 'Inactivo'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BuildingManagerTable;