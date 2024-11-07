import React from "react";
import { TextInputProps } from "../types/TextInputProps";

const TextInput = ({
  label,
  onChange,
  iconLeft,
  iconRight,
  onIconClick,
  placeholder = "",
  type = "text",
  required = false,
  disabled = false,
  error,
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-primary mb-1 font-medium">{label}</label>
      <div className="relative flex items-center">
        {iconLeft && (
          <div className="absolute left-3 text-primary">
            <span className="icon">{iconLeft}</span>
          </div>
        )}
        <input
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={70}
          className={`w-full py-2 px-10 rounded-lg border ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          } ${
            !disabled
              ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
              : ""
          }`}
        />
        {iconRight && (
          <div className="absolute right-3 cursor-pointer text-primary">
            <span className="icon" onClick={onIconClick}>
              {iconRight}
            </span>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </div>
  );
};

export default TextInput;
