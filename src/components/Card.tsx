import React from "react";

type CardProps = {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  badgeClassName?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  badgeText,
  badgeClassName,
  action,
  children,
  className,
}) => {
  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 ${className || ""}`}>
      {(title || subtitle || badgeText || action) && (
        <div className="flex items-start justify-between mb-2">
          <div>
            {title && <h3 className="font-semibold">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {badgeText && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClassName || "bg-gray-50 text-gray-700"}`}>
                {badgeText}
              </span>
            )}
            {action}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;


