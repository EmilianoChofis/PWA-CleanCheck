import React from "react";
import { FileInputProps } from "../types/FileInputProps";

const FileInput: React.FC<FileInputProps> = ({
  label,
  placeholder,
  icon,
  error,
  onChange,
}) => {
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const validFiles = files.filter((file) => file.type.includes("image"));
      onChange(validFiles);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-primary mb-1 font-medium">{label}</label>
      <div
        className={`relative flex items-center border rounded-md p-2 border-gray-300`}
      >
        <div className="flex-grow">
          <input
            type="file"
            multiple
            max={5}
            accept="image/*"
            onChange={handleFileSelection}
            className="w-full py-2 px-10 hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-sm text-gray-600"
          >
            {placeholder}
          </label>
        </div>
        {icon && (
          <div className="absolute right-3 text-primary">
            <span className="icon">{icon}</span>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileInput;
