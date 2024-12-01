import { object, string } from "zod";

export const loginSchema = object({
  email: string({
    required_error: "El correo es requerido",
  })
    .email("Correo inválido")
    .min(1, "El correo es requerido"),
  password: string({
    required_error: "La contraseña es requerida",
  }).min(1, "La contraseña es requerida"),
});
