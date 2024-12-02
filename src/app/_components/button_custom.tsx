"use client";
import React, { useEffect, useState } from "react";
import { ButtonProps } from "../types/ButtonProps";

const ButtonCustom = ({
  children,
  variant,
  icon,
  className = "",
  colorText = "primary",
  backgroundColor = "primary",
  borderColor = "primary",
  type = "button",
  onClick,
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClass = `${className} gap-2 px-4 py-2 rounded-full text-sm font-[family-name:var(--font-jost-medium)]`;

  const [combinedClass, setCombinedClass] = useState("");

  useEffect(() => {
    const colorMap = {
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

    const borderColorMap: { [key: string]: string } = {
      primary: "border-primary",
      secondary: "border-secondary",
      complementary: "border-complementary",
      disabled: "border-disabled",
      success: "border-success",
      error: "border-error",
      warning: "border-warning",
      black: "border-black",
      white: "border-white",
    };

    const variantClass = {
      filled: `hover:bg-opacity-80 ${backgroundColorMap[backgroundColor]}`,
      text: "bg-transparent hover:underline",
      outlined: `border ${borderColorMap[borderColor]} hover:bg-indigo-100`,
    };

    const textColorClass = colorMap[colorText] || colorMap.foreground;
    setCombinedClass(`${baseClass} ${variantClass[variant]} ${textColorClass}`);
  }, [backgroundColor, colorText, variant, className, borderColor, baseClass]);

  return (
    <button
      {...props}
      className={combinedClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
      {icon && <span className="icon px-2">{icon}</span>}
    </button>
  );
};

export default ButtonCustom;
