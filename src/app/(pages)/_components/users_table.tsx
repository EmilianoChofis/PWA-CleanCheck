import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlineOutlined, EditOutlined, PersonOutlineOutlined, RestoreFromTrashOutlined } from "@mui/icons-material";
import { getUsers, changeUserStatus, updateUser } from "@/app/utils/user-service";
import ActivateDeactivateModal from "../manager/users/_components/change_status_modal";
import UpdateUserModal from "../manager/users/_components/update_user_modal";
import { User } from "@/app/types/User";

const UsersTable = ({ searchTerm, activeCategory }: { searchTerm: string; activeCategory: string }) => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [userToModify, setUserToModify] = useState<{ id: string; name: string } | null>(null);
    const [userToUpdate, setUserToUpdate] = useState<{ id: string; name: string; email: string; roleId: string } | null>(null);
    const [currentUserStatus, setCurrentUserStatus] = useState<'active' | 'inactive'>('active');


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const data = await getUsers();
                setUsersData(data);
                setIsLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [searchTerm, activeCategory]);

    const filteredUsers = usersData.filter((user) =>
        (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    ).filter((user) => {
        return user.role?.name === "Maid" || user.role?.name === "Receptionist";
    }).map((user) => ({
        ...user,
        role: {
            ...user.role, // Mantén todas las propiedades del role
            name: user.role?.name === "Maid" ? "Personal de limpieza" : "Recepcionista",
        },
    }));

    if (isLoading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>Error al cargar usuarios: {error}</p>;
    }

    const handleOpenModalUpdate = (user: User) => {
        setUpdateModalIsOpen(true);
        setUserToUpdate({
            id: user.id,
            name: user.name,
            email: user.email,
            roleId: user.role.id,
        });
    };

    const handleCloseModalUpdate = () => {
        setUpdateModalIsOpen(false);
        setUserToUpdate(null);
    };

    const handleConfirmUpdate = async (userId: string, name: string, email: string, roleId: string) => {
        try {
            await updateUser(userId, name, email, roleId);
            const updatedUsers = usersData.map((user) =>
                user.id === userId ? { ...user, name, email } : user
            );
            setUsersData(updatedUsers);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleOpenModalDelete = (user: User) => {
        setDeleteModalIsOpen(true);
        setUserToModify({ id: user.id, name: user.name });
        setCurrentUserStatus(user.status ? 'active' : 'inactive');
    };

    const handleCloseModalDelete = () => {
        setDeleteModalIsOpen(false);
        setUserToModify(null);
    };

    const handleConfirmDelete = async (userId: string, newStatus: 'active' | 'inactive') => {
        try {
            await changeUserStatus(userId, newStatus);
            const updatedUsers = usersData.map((user) =>
                user.id === userId ? { ...user, status: newStatus === 'active' } : user
            );
            setUsersData(updatedUsers);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
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
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id} className="border-b border-gray-200">
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4 flex items-center gap-2 text-primary font-[family-name:var(--font-jost-medium)]">
                                {user.status ? (
                                    <button className="p-2 bg-complementary rounded-full">
                                        <PersonOutlineOutlined className="text-background" />
                                    </button>
                                ) : (
                                    <button className="p-2 bg-error rounded-full">
                                        <PersonOutlineOutlined className="text-background" />
                                    </button>
                                )}
                                {user.name}
                            </td>
                            <td className="py-3 px-4">{user.role.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4 flex gap-2">
                                {user.status ? (
                                    <>
                                        <button
                                            className="p-2 border-2 border-primary rounded-full"
                                            onClick={() => handleOpenModalUpdate(user)}
                                        >
                                            <EditOutlined className="text-primary" />
                                        </button>
                                        <button
                                            className="p-2 border-2 border-error rounded-full"
                                            onClick={() => handleOpenModalDelete(user)}
                                        >
                                            <DeleteOutlineOutlined className="text-error" />
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="p-2 border-2 border-secondary rounded-full"
                                        onClick={() => handleOpenModalDelete(user)}
                                    >
                                        <RestoreFromTrashOutlined className="text-secondary" />
                                    </button>
                                )}
                            </td>
                            <td className="py-3 px-4">
                                <button
                                    className={`py-1 px-4 rounded-lg ${user.status ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                                >
                                    {user.status ? "Activo" : "Inactivo"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ActivateDeactivateModal
                isOpen={deleteModalIsOpen}
                onClose={handleCloseModalDelete}
                userName={userToModify?.name || ''}
                userId={userToModify?.id || ''}
                onConfirm={handleConfirmDelete}
                currentStatus={currentUserStatus}
            />
            <UpdateUserModal
                isOpen={updateModalIsOpen}
                onClose={handleCloseModalUpdate}
                userName={userToUpdate?.name || ''}
                userEmail={userToUpdate?.email || ''}
                userId={userToUpdate?.id || ''}
                roleId={userToUpdate?.roleId || ''}
                onConfirm={handleConfirmUpdate}
            />
        </>
    );
};

export default UsersTable;