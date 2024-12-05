import React from "react";
import { NumberInputProps } from "../types/NumberInputProps";

const NumberInput = ({
    onChange,
    value,
    iconLeft,
    iconRight,
    placeholder = "",
    required = false,
    disabled = false,
    error,
}: NumberInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(Number(value)) || value === "") {
            onChange(e);
        }
    };

    return (
        <div className="mb-4">
            <div className="relative flex items-center">
                {iconLeft && (
                    <div className="absolute left-3 text-primary">
                        <span className="icon">{iconLeft}</span>
                    </div>
                )}
                <input
                    type="number"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={`w-full py-2 px-10 rounded-lg border ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${!disabled ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : ""}`}
                />
                {iconRight && (
                    <button
                        type="button"
                        className="absolute right-3 cursor-pointer text-primary"
                        tabIndex={0}
                    >
                        <span className="icon">{iconRight}</span>
                    </button>
                )}
            </div>
            {error && <p className="mt-2 text-sm text-error">{error}</p>}
        </div>
    );
};

export default NumberInput;