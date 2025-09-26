import React, { useEffect } from "react";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Popup({ isOpen, onClose, title, children, footer }: PopupProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onMouseDown={onClose} // clicking backdrop closes
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* modal */}
      <div
        className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-4"
        onMouseDown={(e) => e.stopPropagation()} // stop closing when clicking inside
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded"
          >
            ✕
          </button>
        </div>

        <div>{children}</div>

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}
