export type TextInputProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconLeft: React.ReactNode;
  iconRight?: React.ReactNode;
  onIconClick?: () => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
};
