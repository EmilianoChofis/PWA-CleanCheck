import React from 'react';
import { DeleteOutlineOutlined, EditOutlined, RestoreFromTrashOutlined } from '@mui/icons-material';
import BedOutlined from '@mui/icons-material/BedOutlined';

const roomsData = [
    { id: 1, name: "P1H1", active: true },
    { id: 2, name: "P1H2", active: true },
    { id: 3, name: "P1H3", active: false },
    { id: 4, name: "P1H4", active: true },
    { id: 5, name: "P1H5", active: false },
];

const RoomsTable = () => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100 text-left text-sm border-b border-gray-200 font-bold">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Habitación</th>
                    <th className="py-3 px-4">Acciones</th>
                    <th className="py-3 px-4">Estado</th>
                </tr>
            </thead>
            <tbody>
                {roomsData.map((room) => (
                    <tr key={room.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{room.id}</td>
                        <td className="py-3 px-4 flex items-center gap-2 text-primary font-medium">
                            <button
                                className={`p-2 rounded-full ${room.active ? 'bg-complementary' : 'bg-error'}`}
                                aria-label={`Estado de la habitación ${room.name}`}
                            >
                                <BedOutlined className="text-background" />
                            </button>
                            {room.name}
                        </td>
                        <td className="py-3 px-4 flex gap-2">
                            {room.active ? (
                                <>
                                    <button
                                        className="p-2 border-2 border-primary rounded-full"
                                        aria-label={`Editar habitación ${room.name}`}
                                    >
                                        <EditOutlined className="text-primary" />
                                    </button>
                                    <button
                                        className="p-2 border-2 border-error rounded-full"
                                        aria-label={`Eliminar habitación ${room.name}`}
                                    >
                                        <DeleteOutlineOutlined className="text-error" />
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="p-2 border-2 border-secondary rounded-full"
                                    aria-label={`Restaurar habitación ${room.name}`}
                                >
                                    <RestoreFromTrashOutlined className="text-secondary" />
                                </button>
                            )}
                        </td>
                        <td className="py-3 px-4">
                            <span
                                className={`py-1 px-4 inline-block rounded-lg shadow ${
                                    room.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                }`}
                            >
                                {room.active ? 'Activo' : 'Inactivo'}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RoomsTable;
