export interface PaginationType {
    filter: string;
    limit: number;
    order: 'asc' | 'desc';
    page: number;
    sortBy: string;
}

export interface PaginationDto {
    paginationType: PaginationType;
    value: string;
}

export const getUsers = async (paginationDto: PaginationDto) => {
    const response = await fetch(`${process.env.URL_BASE}/user/getAll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paginationDto),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener los usuarios');
    }

    const apiResponse = await response.json();

    if (apiResponse.error) {
        throw new Error(apiResponse.message || 'Error en la respuesta del servidor');
    }

    return apiResponse.data;
};

export const changeUserStatus = async (userId: string, status: string) => {
    const response = await fetch(`${process.env.URL_BASE}/user/updateStatus/${userId}`, {
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
