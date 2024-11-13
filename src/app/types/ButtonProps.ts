export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant: "filled" | "text" | "outlined";
  colorText?:
    | "primary"
    | "secondary"
    | "complementary"
    | "disabled"
    | "success"
    | "error"
    | "warning"
    | "foreground"
    | "background";
  backgroundColor?: string;
  borderColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};
