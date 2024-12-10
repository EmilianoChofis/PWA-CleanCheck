"use server";

export const changeStatusOccupied = async (roomId: string) => {
    const response = await fetch(`${process.env.URL_BASE}/room/changeStatusOccupied/${roomId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al cambiar el estado de la habitación a ocupada");
    }

    return response.json();
};

export const changeStatusUnoccupied = async (roomId: string) => {
    const response = await fetch(`${process.env.URL_BASE}/room/changeStatusUnoccupied/${roomId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al cambiar el estado de la habitación a desocupada");
    }

    return response.json();
};