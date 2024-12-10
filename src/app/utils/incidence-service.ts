"use server";

export const getIncidences = async () => {
  const response = await fetch(`${process.env.URL_BASE}/report/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las incidencias");
  }

  return response.json();
};

export const changeStatusInProcess = async (id: string) => {
  const response = await fetch(
    `${process.env.URL_BASE}/report/updateStatusIn/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al cambiar el estado de la incidencia");
  }

  return response.json();
};

export const changeStatusFinished = async (id: string) => {
  const response = await fetch(
    `${process.env.URL_BASE}/report/updateStatusFinish/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al cambiar el estado de la incidencia");
  }

  return response.json();
};
