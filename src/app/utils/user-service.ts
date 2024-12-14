"use server";
import { User } from "../types/User";

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(`${process.env.URL_BASE}/user/getAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log("Respuesta del servidor:", response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener los usuarios');
    }

    const apiResponse = await response.json();

    if (apiResponse.error) {
        throw new Error(apiResponse.message || 'Error en la respuesta del servidor');
    }

    console.log("Usuarios obtenidos:", apiResponse.data);
    return apiResponse.data as User[];
};

export const getActiveUsers = async (): Promise<User[]> => {
    const response = await fetch(`${process.env.URL_BASE}/user/getActive`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log("Respuesta del servidor:", response);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener los usuarios activos');
    }
    const apiResponse = await response.json();

    if (apiResponse.error) {
        throw new Error(apiResponse.message || 'Error en la respuesta del servidor');
    }
    return apiResponse.data as User[]; 
};

export const changeUserStatus = async (userId: string, status: string) => {
    const response = await fetch(`${process.env.URL_BASE}/user/changeStatus/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newStatus: status,
        }),
    });

    if (!response.ok) {
        throw new Error('Error al cambiar el estado del usuario');
    }

    return response.json();
};


export const updateUser = async (userId: string, name: string, email: string, roleId: string) => {
    const response = await fetch(`${process.env.URL_BASE}/user/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: userId,
            name,
            email,
            roleId,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el usuario');
    }

    return response.json();
}


