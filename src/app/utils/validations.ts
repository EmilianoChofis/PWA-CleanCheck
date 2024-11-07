export const validateEmail = (email: string) => {
  if (!email) {
    return "El correo electrónico es obligatorio.";
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return "El correo electrónico no es válido.";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "La contraseña es obligatoria.";
  }
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (!confirmPassword) {
    return "La confirmación de contraseña es obligatoria.";
  }
  if (confirmPassword !== password) {
    return "Las contraseñas no coinciden.";
  }
  return "";
};
