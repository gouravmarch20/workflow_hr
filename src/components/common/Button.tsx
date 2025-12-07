import React, { memo } from "react";

export const Button = memo(
  ({
    children,
    onClick,
    variant = "primary",
    className = "",
    disabled = false,
    type = "button",
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "success";
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit";
  }) => {
    const baseStyles =
      "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 active:scale-95",
      danger: "bg-red-600 text-white hover:bg-red-700 active:scale-95",
      success: "bg-green-600 text-white hover:bg-green-700 active:scale-95",
    };

    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }
);
