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
