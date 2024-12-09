export type FileInputProps = {
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
  onChange: (files: File[]) => void;
};
