import { URL_BASE } from './url-base';

export const getBuildings = async () => {
	const response = await fetch(`${URL_BASE}/dashboard/getAll`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Error al obtener los edificios');
	}

	return response.json();
};

export const getBuildingsByStatus = async (status: string) => {
	const response = await fetch(`${URL_BASE}/room/getByStatus`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			status: status,
		}),
	});

	if (!response.ok) {
		throw new Error('Error al obtener los edificios por estado');
	}

	return response.json();
};

export const changeStatusRoom = async (roomId: string, status: string) => {
	const response = await fetch(`${URL_BASE}/room/change-status`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id: roomId,
			newStatus: status,
		}),
	});

	if (!response.ok) {
		throw new Error('Error al cambiar el estado de la habitación');
	}

	return response.json();
};
