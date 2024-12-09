import { URL_BASE } from "./url-base";

export const getIncidences = async () => {
  const response = await fetch(`${URL_BASE}/report/getAll`, {
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
