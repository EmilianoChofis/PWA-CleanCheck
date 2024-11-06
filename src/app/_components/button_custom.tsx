import React from "react";
import { ButtonProps } from "../types/ButtonProps";

// Mapa de colores de texto
const colorMap: { [key: string]: string } = {
  primary: "text-primary",
  secondary: "text-secondary",
  complementary: "text-complementary",
  disabled: "text-disabled",
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
  foreground: "text-foreground",
  background: "text-background",
};

// Mapa de colores de fondo
const backgroundColorMap: { [key: string]: string } = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  complementary: "bg-complementary",
  disabled: "bg-disabled",
  success: "bg-success",
  error: "bg-error",
  warning: "bg-warning",
  black: "bg-black",
  white: "bg-white",
};

const ButtonCustom = ({
  children,
  variant,
  icon,
  className = "",
  colorText = "primary",
  backgroundColor = "primary",
  type = "button",
  onClick,
  ...props
}: ButtonProps) => {
  const baseClass =
    `${className} gap-2 px-4 py-2 rounded-full text-sm font-[family-name:var(--font-jost-medium)]`;

  const variantClass = {
    filled: `hover:bg-opacity-80 ${backgroundColorMap[backgroundColor]}`,
    text: "bg-transparent hover:underline",
    outlined: `border border-primary hover:bg-indigo-100`,
  };

  const textColorClass = colorMap[colorText] || colorMap.foreground;
  const combinedClass = `${baseClass} ${variantClass[variant]} ${textColorClass}`;

  return (
    <button {...props} className={combinedClass} onClick={onClick}>
      {children}
      {icon && <span className="icon px-2">{icon}</span>}
    </button>
  );
};

export default ButtonCustom;
