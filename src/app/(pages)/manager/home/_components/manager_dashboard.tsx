"use client";
import { useEffect, useState } from "react";
import Title from "@/app/_components/title";
import { ApartmentOutlined, PersonOutline } from "@mui/icons-material";
import {getUsers } from "@/app/utils/user-service";
import { User } from "@/app/types/User";
import router from "next/dist/client/router";

const buildingData = [
    {
        id: 1,
        name: "Edificio Altapalmira",
        reportedRooms: 2,
        disabledRooms: 1,
        totalRooms: 18,
    },
    {
        id: 2,
        name: "Edificio Paseos del río",
        reportedRooms: 3,
        disabledRooms: 2,
        totalRooms: 19,
    },
    {
        id: 3,
        name: "Edificio Calle de los doctores",
        reportedRooms: 1,
        disabledRooms: 0,
        totalRooms: 16,
    },
];

const ManagerDashboard = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
    }, []);
    const filteredUsers = usersData.filter((user) =>{
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
    

    return (
        <div className="flex flex-col gap-8">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <Title title="Edificios" className="text-2xl font-bold" />
                    <button
                        onClick={() => router.push("/manager/buildings")}
                        className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark"
                    >
                        Ver más
                    </button>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm border-b border-gray-200 font-[family-name:var(--font-jost-bold)]">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Edificio</th>
                            <th className="py-3 px-4 text-center">Habitaciones Reportadas</th>
                            <th className="py-3 px-4 text-center">Habitaciones Deshabilitadas</th>
                            <th className="py-3 px-4 text-center">Total de habitaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buildingData.slice(0, 3).map((building, index) => (
                            <tr key={building.id} className="border-b border-gray-200">
                                <td className="py-3 px-4 text-center">{index + 1}</td>
                                <td className="py-3 px-4 flex items-center gap-2 text-primary font-[family-name:var(--font-jost-medium)]">
                                    <button className="p-2 bg-primary rounded-full">
                                        <ApartmentOutlined className="text-background" />
                                    </button>
                                    {building.name}
                                </td>
                                <td className="py-3 px-4 text-orange-500 text-center">
                                    {building.reportedRooms}
                                </td>
                                <td className="py-3 px-4 text-error text-center">
                                    {building.disabledRooms}
                                </td>
                                <td className="py-3 px-4 font-[family-name:var(--font-jost-medium)] text-center">
                                    {building.totalRooms}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <Title title="Usuarios" className="text-2xl font-bold" />
                    <button
                        onClick={() => router.push("/manager/users")}
                        className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark"
                    >
                        Ver más
                    </button>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm border-b border-gray-200 font-[family-name:var(--font-jost-bold)]">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Nombre</th>
                            <th className="py-3 px-4">Correo</th>
                            <th className="py-3 px-4">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.slice(0, 3).map((user, index) => (
                            <tr key={user.id} className="border-b border-gray-200">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4 flex items-center gap-2 text-primary font-[family-name:var(--font-jost-medium)]">
                                    <button className="p-2 bg-primary rounded-full">
                                        <PersonOutline className="text-background" />
                                    </button>
                                    {user.name}
                                </td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">{user.role.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerDashboard;
