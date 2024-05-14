import { InfoCard } from "./info-card";
import { useState } from "react";

export const TooltipInfo = () => {
  const [toggleInfo, setToggleInfo] = useState(false);

  const handleToggleInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggleInfo((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        className="absolute top-1/2 transform -translate-y-1/2 min-w-[300px]"
        onMouseEnter={handleToggleInfo}
        onMouseLeave={handleToggleInfo}
      >
        {toggleInfo && <InfoCard info="" />}
      </button>
    </div>
  );
};
