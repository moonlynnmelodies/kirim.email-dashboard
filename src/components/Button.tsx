

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "text-white bg-[#0B2656] hover:bg-[#274e8a]",
  secondary: "text-gray-800 bg-gray-300 hover:bg-gray-200",
  danger: "text-white bg-red-600 hover:bg-red-700",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "sm",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer ${sizeClasses[size]} font-medium rounded-lg shadow-md hover:shadow-lg transition ${variantClasses[variant]} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;


