import React from 'react';
import { DeleteOutlineOutlined, EditOutlined, PersonOutlineOutlined, RestoreFromTrashOutlined } from '@mui/icons-material'; // Removed ApartmentOutlined

const usersData = [
    {
        id: 1,
        name: "Yahir Degante Salinas",
        typeUser: "Personal de Servicio",
        email: "yahir@gmail.com",
        active: true,
    },
    {
        id: 2,
        name: "Yahir Degante Salinas",
        typeUser: "Personal de Servicio",
        email: "yahir@gmail.com",
        active: true,
    },
    {
        id: 3, // Added ID
        name: "Yahir Degante Salinas",
        typeUser: "Personal de Servicio",
        email: "yahir@gmail.com",
        active: false,
    },
    {
        id: 4,
        name: "Yahir Degante Salinas",
        typeUser: "Personal de Servicio",
        email: "yahir@gmail.com",
        active: true,
    },
    {
        id: 5,
        name: "Yahir Degante Salinas",
        typeUser: "Personal de Servicio",
        email: "yahir@gmail.com",
        active: false,
    },
];

const UsersTable = () => {

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100 text-left text-sm border-b border-gray-200 font-bold">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Nombre</th>
                    <th className="py-3 px-4">Tipo de Usuario</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Acciones</th>
                    <th className="py-3 px-4">Estado</th>
                </tr>
            </thead>
            <tbody>
                {usersData.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{user.id}</td>
                        <td className="py-3 px-4 flex items-center gap-2 text-primary font-[family-name:var(--font-jost-medium)]">
                            {user.active ? (
                                <button className="p-2 bg-complementary rounded-full">
                                    <PersonOutlineOutlined className="text-background" />
                                </button>
                            ) : (
                                <button className="p-2 bg-error rounded-full">
                                    <PersonOutlineOutlined className="text-background" />
                                </button>
                            )
                            }
                            {user.name}
                        </td>
                        <td className="py-3 px-4">{user.typeUser}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4 flex gap-2">
                            {user.active && (
                                <>
                                    <button className="p-2 border-2 border-primary rounded-full" aria-label={`Editar usuario ${user.name}`}>
                                        <EditOutlined className="text-primary" />
                                    </button>
                                    <button className="p-2 border-2 border-error rounded-full" aria-label={`Eliminar usuario ${user.name}`}>
                                        <DeleteOutlineOutlined className="text-error" />
                                    </button>
                                </>
                            )}
                            {!user.active && (
                                <button className="p-2 border-2 border-secondary rounded-full" aria-label={`Restaurar usuario ${user.name}`}>
                                    <RestoreFromTrashOutlined className="text-secondary" />
                                </button>
                            )}
                        </td>
                        <td className="py-3 px-4">
                            <button className={`py-1 px-4 rounded-lg ${user.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {user.active ? 'Activo' : 'Inactivo'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;