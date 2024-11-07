// PasswordStrengthBar.jsx
import React from "react";

interface PasswordCheckerBarProps {
  strength: number;
}
const PasswordChecker: React.FC<PasswordCheckerBarProps> = ({ strength }) => {
  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-400";
      case 4:
        return "bg-green-600";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      className="w-full h-2 mt-2 bg-gray-300"
      style={{ borderRadius: "1rem" }}
    >
      <div
        className={`h-full ${getStrengthColor(strength)}`}
        style={{
          width: `${(strength / 4) * 100}%`,
          transition: "width 0.5s",
          borderRadius: "1rem",
        }}
      ></div>
      <p className="text-sm text-gray-500 text-right mt-1"
      >
        {strength === 0
          ? "Muy débil"
          : strength === 1
          ? "Débil"
          : strength === 2
          ? "Regular"
          : strength === 3
          ? "Buena"
          : strength === 4
          ? "Excelente"
          : ""}
      </p>
    </div>
  );
};

export default PasswordChecker;
