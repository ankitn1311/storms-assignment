import React, { FC, ReactNode } from "react";

type DefaultButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
} & DefaultButtonProps;

const Button: FC<ButtonProps> = ({
  fullWidth = false,
  children,
  className,
  ...buttonProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      {...buttonProps}
      className={`p-2 md:p-3 select-none text-gray-200 bg-teal-600 hover:bg-teal-700 active:bg-teal-600 focus:outline-none focus:ring-teal-600 focus:ring-offset-1 focus:ring-2 text-sm font-medium rounded-lg ${fullWidthStyle}  ${className}`}>
      {children}
    </button>
  );
};

export default Button;
