import { useState } from "react";
import type { ReactNode } from "react";


interface DropdownProps {
  children: ReactNode;
  className?: string;
}

interface DropdownButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ children, className }) => {
  return <div className={`relative w-full ${className}`}>{children}</div>;
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center  rounded hover:bg-gray-100 hover:border border-blue-500 px-4 py-2 text-left"
    >
      {children}
    </button>
  );
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return (
    <div className="absolute left-0 w-full mt-1 bg-white border rounded shadow-lg z-50">
      {children}
    </div>
  );
};

export const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
};
