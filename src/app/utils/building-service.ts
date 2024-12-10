const URL_BASE = process.env.URL_BASE;

"use server";

export const getBuildings = async () => {
  const response = await fetch(`${URL_BASE}/dashboard/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export const getBuildingsByStatus = async (
  buildingId: string,
  status: string
) => {
  const response = await fetch(
    `${process.env.URL_BASE}/room/getByStatusAndBuilding`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        buildingId: buildingId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los edificios por estado");
  }

  return response.json();
};

export const createReport = async (
  description: string,
  userId: string,
  roomId: string,
  files: File[]
) => {
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const base64Files = await Promise.all(
    files.map((file) => convertToBase64(file))
  );

  const response = await fetch(`${process.env.URL_BASE}/report/create`, {
    method: "POST",
    body: JSON.stringify({
      description: description,
      userId: userId,
      roomId: roomId,
      files: base64Files,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al crear el reporte");
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
};
