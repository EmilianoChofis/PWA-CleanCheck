import React from 'react';
import { ApartmentOutlined, DeleteOutlineOutlined, EditOutlined, RestoreFromTrashOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { changeStatusBuilding } from "@/app/utils/building-service";
import { Toast } from '@/app/lib/toast';
const handleStatusBuilding = async (buildingId: string, fetchBuildings:(category:string)=>void,clickedCategory:string) => {
    try {
        const response= await changeStatusBuilding(buildingId);
        if (response.statusCode === 200) {
            await Toast.fire({
                icon: "success",
                title: "Edificio actualizado correctamente",
            });
                fetchBuildings(clickedCategory);
            } else {
                await Toast.fire({
                    icon: "error",
                    title: "Error al actualizar el edificio",
                });
                 }
    } catch (error) {
        console.error("Error changing building status:", error);
    }
}
//eslint-disable-next-line @typescript-eslint/no-explicit-any
const BuildingManagerTable = ({ buildings, fetchBuildings, clickedCategory }: { buildings: any[]; fetchBuildings: (category: string) => void; clickedCategory: string}) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100 text-left text-sm border-b border-gray-200 font-bold">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4 text-center">Edificio</th>
                    <th className="py-3 px-4 text-center">Habitaciones Reportadas</th>
                    <th className="py-3 px-4 text-center">Habitaciones Deshabilitadas</th>
                    <th className="py-3 px-4 text-center">Total de habitaciones</th>
                    <th className="py-3 px-4 text-center">Acciones</th>
                    <th className="py-3 px-4 text-center">Estado</th>
                </tr>
            </thead>
            <tbody>
            {buildings.length === 0 ? (
                <tr>
                    <td colSpan={7} className="py-3 px-4 text-center">No hay edificios disponibles</td>
                </tr>
            ) : null}
                {buildings.map((building, index) => (
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
                            {building.status ? (
                                <>
                                    <button className="p-2 border-2 border-primary rounded-full" aria-label={`Editar edificio ${building.name}`}>
                                        <EditOutlined className="text-primary" />
                                    </button>
                                    <button 
                                        className="p-2 border-2 border-error rounded-full" 
                                        aria-label={`Eliminar edificio ${building.name}`} 
                                        onClick={() => handleStatusBuilding(building.id, fetchBuildings, clickedCategory)}
                                    >
                                        <DeleteOutlineOutlined className="text-error" />
                                    </button>
                                </>
                            ) : (
                                <button 
                                className="p-2 border-2 border-secondary rounded-full" 
                                aria-label={`Restaurar edificio ${building.name}`}
                                onClick={() => handleStatusBuilding(building.id, fetchBuildings, clickedCategory)}
                                >
                                    <RestoreFromTrashOutlined className="text-secondary" />
                                </button>
                            )}
                        </td>
                        <td className="py-3 px-4">
                            <button className={`py-1 px-4 rounded-lg ${building.status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {building.status ? 'Activo' : 'Inactivo'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BuildingManagerTable;
