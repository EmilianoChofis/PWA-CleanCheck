import { object, string, z } from "zod";

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

export const createReportSchema = object({
  description: string({
    required_error: "La descripción es requerida",
  }).min(1, "La descripción es requerida"),
  files: z
    .array(z.instanceof(File))
    .max(5, "Solo puedes subir un máximo de 5 archivos."),
});
