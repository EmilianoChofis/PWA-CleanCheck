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
	};

	return response.json();
};

export const getBuildingsBuildingApi = async () => {
	const response = await fetch(`${URL_BASE}/building/getAll`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Error al obtener los edificios');
	};

	return response.json();
};

export const getBuildingsActive = async () => {
	const response = await fetch(`${URL_BASE}/building/getAllActive`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Error al obtener los edificios');
	};

	return response.json();
};
export const getBuildingsInactive = async () => {
	const response = await fetch(`${URL_BASE}/building/getAllInactive`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Error al obtener los edificios');
	};

	return response.json();
};

export const getBuildingsByStatus = async (buildingId: string, status: string) => {
	const response = await fetch(`${URL_BASE}/room/getByStatusAndBuilding`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			status: status,
			buildingId: buildingId,
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

export const changeStatusBuilding = async (buildingId: string) => {
	const response = await fetch(`${URL_BASE}/building/changeStatus/${buildingId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id: buildingId,
		}),
	});

	if (!response.ok) {
		throw new Error('Error al cambiar el estado del edificio');
	}

	return response.json();
}

export const createBuilding = async (name: string, floors: number) => {
	const response = await fetch(`${URL_BASE}/building/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
		}),
	});

	if (!response.ok) {
		throw new Error('Error al crear el edificio');
	}

	const theResponse = await response.json();
	const buildingId = theResponse.data.id;

	const floorsArray = [];
	for (let i = 0; i < floors; i++) {
		const newFloor = {
			name: `piso ${i + 1}`,
			buildingId: buildingId,
		};
		floorsArray.push(newFloor);
	}

	const response2 = await fetch(`${URL_BASE}/floor/createList`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(
			floorsArray
		),
	});

	if (!response2.ok) {
		throw new Error('Error al crear los pisos');
	}

	return response2.json();
};

export const createRoomsList = async (floorId: string, rooms: number) => {
	const roomsArray = [];
	for (let i = 0; i < rooms; i++) {
		const newRoom = {
			identifier: `habitación ${i + 1}`,
			name: `habitación ${i + 1}`,
			floorId: floorId,
		};
		roomsArray.push(newRoom);
	}

	const response = await fetch(`${URL_BASE}/room/createList`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(
			roomsArray
		),
	});

	if (!response.ok) {
		throw new Error('Error al crear las habitaciones');
	}

	return response.json();
}