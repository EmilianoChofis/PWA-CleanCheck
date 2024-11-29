import React, { forwardRef } from "react";
import { TextInputProps } from "../types/TextInputProps";

const TextInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  const {
    label,
    type,
    placeholder,
    iconLeft,
    iconRight,
    onIconClick,
    error,
    ...rest
  } = props;
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
          {...rest}
          ref={ref}
          type={type}
          placeholder={placeholder}
          maxLength={70}
          className="w-full py-2 px-10 rounded-lg border"
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
});

export default TextInput;
