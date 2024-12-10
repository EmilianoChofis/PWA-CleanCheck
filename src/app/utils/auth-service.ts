"use server";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.URL_BASE}/auth/signIn`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Correo y/o contraseña incorrectos");
  }

  return response.json();
};

export const registerUser = async (name: string, email: string, roleId: string, password: string, endpoint: string) => {
  const response = await fetch(`${process.env.URL_BASE}/auth/createUser${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, roleId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al registrar el usuario');
  }

  return response.json();
};

