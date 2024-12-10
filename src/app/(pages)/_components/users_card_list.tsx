import React, { useEffect, useState } from "react";
import { DeleteOutlineOutlined, EditOutlined, PersonOutlineOutlined, RestoreFromTrashOutlined } from "@mui/icons-material";
import { getUsers, changeUserStatus, updateUser } from "@/app/utils/user-service";
import ActivateDeactivateModal from "../manager/users/_components/change_status_modal";
import UpdateUserModal from "../manager/users/_components/update_user_modal";
import { User } from "@/app/types/User";

const UsersCardList = ({ searchTerm }: { searchTerm: string }) => {
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
                console.log("Data:", data);
                setUsersData(data);
                console.log("Users:", usersData);
                setIsLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = usersData.filter((user) =>
        (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    ).filter((user) => {
        return user.role?.name === "Maid" || user.role?.name === "Receptionist";
    }).map((user) => ({
        ...user,
        role: {
            ...user.role,
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
            roleId: user.role.name,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
                <div key={user.id} className="bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary rounded-full text-center">
                            <PersonOutlineOutlined className="text-background" />
                        </div>
                        <div>
                            <p className="text-lg font-medium">{user.name}</p>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm">Tipo de Usuario: {user.role.name}</p>
                        <p className="text-sm">{user.status ? "Activo" : "Inactivo"}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                        {user.status ? (
                            <>
                                <button
                                    className="p-2 border-2 border-primary rounded-full"
                                    aria-label={`Editar usuario ${user.name}`}
                                    onClick={() => handleOpenModalUpdate(user)}
                                >
                                    <EditOutlined className="text-primary" />
                                </button>
                                <button
                                    className="p-2 border-2 border-error rounded-full"
                                    aria-label={`Eliminar usuario ${user.name}`}
                                    onClick={() => handleOpenModalDelete(user)}
                                >
                                    <DeleteOutlineOutlined className="text-error" />
                                </button>
                            </>
                        ) : (
                            <button
                                className="p-2 border-2 border-secondary rounded-full"
                                aria-label={`Restaurar usuario ${user.name}`}
                                onClick={() => handleOpenModalDelete(user)}
                            >
                                <RestoreFromTrashOutlined className="text-secondary" />
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <ActivateDeactivateModal
                isOpen={deleteModalIsOpen}
                onClose={handleCloseModalDelete}
                userName={userToModify?.name ?? ''}
                userId={userToModify?.id ?? ''}
                onConfirm={handleConfirmDelete}
                currentStatus={currentUserStatus}
            />
            <UpdateUserModal
                isOpen={updateModalIsOpen}
                onClose={handleCloseModalUpdate}
                userName={userToUpdate?.name ?? ''}
                userEmail={userToUpdate?.email ?? ''}
                userId={userToUpdate?.id ?? ''}
                roleId={userToUpdate?.roleId ?? ''}
                onConfirm={handleConfirmUpdate}
            />
        </div>
    );
};

export default UsersCardList;
