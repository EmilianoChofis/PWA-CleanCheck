import React, { useEffect, useState } from "react";
import { DeleteOutlineOutlined, EditOutlined, PersonOutlineOutlined, RestoreFromTrashOutlined } from "@mui/icons-material";
import { getUsers, changeUserStatus, updateUser } from "@/app/utils/user-service";
import ActivateDeactivateModal from "../manager/users/_components/change_status_modal";
import UpdateUserModal from "../manager/users/_components/update_user_modal";
import { User } from "@/app/types/User";
import useConnectionStatus from "@/hooks/useConectionStatus";
import { initDB, saveUserLocal, getUsersLocal, User as UserLocal, deleteAllUserLocal } from "@/utils/indexedDB";
import { processOfflineRegistrations, processOfflineUpdates } from "@/utils/offline-manager";

const UsersTable = ({ searchTerm, activeCategory }: { searchTerm: string; activeCategory: string }) => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [userDataLocal, setUserDataLocal] = useState<UserLocal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [userToModify, setUserToModify] = useState<{ id: string; name: string } | null>(null);
    const [userToUpdate, setUserToUpdate] = useState<{ id: string; name: string; email: string; roleId: string } | null>(null);
    const [currentUserStatus, setCurrentUserStatus] = useState<'active' | 'inactive'>('active');
    const isOnline = useConnectionStatus();  
    
    useEffect(() => {
        initDB().catch(console.error);

        if (isOnline) {
            processOfflineRegistrations().catch(console.error);
            processOfflineUpdates().catch(console.error);
        }
    }, [isOnline]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                if (isOnline) {
                    const data = await getUsers();
                    await deleteAllUserLocal();
                    for (const user of data) {
                        await saveUserLocal({
                            userName: user.name,
                            userEmail: user.email,
                            userId: user.id,
                            roleId: user.role.id,
                        });
                    }
                    setUsersData(data);
                } else {
                    const cachedData: UserLocal[] = await getUsersLocal();
                    setUserDataLocal(cachedData);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [isOnline, searchTerm, activeCategory]);



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

    const handleOpenModalUpdateLocal = (user: UserLocal) => {
        setUpdateModalIsOpen(true);
        setUserToUpdate({
            id: user.userId,
            name: user.userName,
            email: user.userEmail,
            roleId: user.roleId,
        });
    }

    const handleCloseModalUpdate = () => {
        setUpdateModalIsOpen(false);
        setUserToUpdate(null);
    };

    const handleConfirmUpdate = async (userId: string, name: string, email: string, roleId: string) => {
        try {
            if (isOnline) {
                await updateUser(userId, name, email, roleId);
                const updatedUsers = usersData.map((user) =>
                    user.id === userId ? { ...user, name, email } : user
                );
                setUsersData(updatedUsers);
                for (const user of updatedUsers) {
                    await saveUserLocal({
                        userName: user.name,
                        userEmail: user.email,
                        userId: user.id,
                        roleId: user.role.id,
                    });
                }
            } else {
                const updatedUsers = usersData.map((user) =>
                    user.id === userId ? { ...user, name, email } : user
                );
                setUsersData(updatedUsers);
                for (const user of updatedUsers) {
                    await saveUserLocal({
                        userName: user.name,
                        userEmail: user.email,
                        userId: user.id,
                        roleId: user.role.id,
                    });
                }
            }
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
            if (isOnline) {
                await changeUserStatus(userId, newStatus);
            }
            const updatedUsers = usersData.map((user) =>
                user.id === userId ? { ...user, status: newStatus === 'active' } : user
            );
            setUsersData(updatedUsers);
            for (const user of updatedUsers) {
                await saveUserLocal({
                    userName: user.name,
                    userEmail: user.email,
                    userId: user.id,
                    roleId: user.role.id,
                });
            }
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
            {isOnline ? (
                usersData
                    .filter((user) =>
                        user.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((user, index) => (
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
                    ))
            ) : (
                userDataLocal
                    .filter((user) =>
                        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((user, index) => (
                        <tr key={user.userId} className="border-b border-gray-200">
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4 flex items-center gap-2 text-primary font-[family-name:var(--font-jost-medium)]">
                                <button className="p-2 bg-complementary rounded-full">
                                    <PersonOutlineOutlined className="text-background" />
                                </button>
                                {user.userName}
                            </td>
                            <td className="py-3 px-4">{user.roleId}</td>
                            <td className="py-3 px-4">{user.userEmail}</td>
                            <td className="py-3 px-4 flex gap-2">
                                <button
                                    className="p-2 border-2 border-primary rounded-full"
                                    onClick={() => handleOpenModalUpdateLocal(user)}
                                >
                                    <EditOutlined className="text-primary" />
                                </button>
                                <button
                                    className="p-2 border-2 border-error rounded-full"
                                    onClick={() => handleOpenModalUpdateLocal(user)}
                                >
                                    <DeleteOutlineOutlined className="text-error" />
                                </button>
                            </td>
                            <td className="py-3 px-4">
                                <button className="py-1 px-4 rounded-lg bg-green-500 text-white">
                                    Activo
                                </button>
                            </td>
                        </tr>
                    ))
            )}
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