import React from "react";

interface HouseDetailObjectProps {
  icon: {
    src: string;
  };
  name: string;
  quantity: number | string;
}

export const HouseItem: React.FC<HouseDetailObjectProps> = ({
  icon,
  name,
  quantity,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={icon.src} alt={name} className="w-6 h-6" />
        <span className="text-xs font-medium text-gray-900">{name}</span>
      </div>

      <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded">
        <span className="text-xs font-medium text-gray-900">{quantity}</span>
      </div>
    </div>
  );
};
