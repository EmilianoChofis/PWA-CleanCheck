export type NumberInputProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: number; 
    iconLeft: React.ReactNode;
    iconRight?: React.ReactNode;
    onIconClick?: () => void;
    placeholder?: string;
    type?: "number";
    required?: boolean;
    disabled?: boolean;
    error?: string;
};
