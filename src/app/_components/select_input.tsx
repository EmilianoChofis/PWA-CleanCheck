import React from 'react';

interface SelectInputProps {
    label: string;
    iconLeft: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, iconLeft, onChange, value, options, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-primary mb-1 font-medium">{label}</label>
            <div className="relative">
                {iconLeft && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {iconLeft}
                    </div>
                )}
                <select
                    className="w-full border border-gray-300 rounded-md px-10 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                    value={value}
                    onChange={onChange}
                >
                    {placeholder && <option value="" disabled>{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectInput;