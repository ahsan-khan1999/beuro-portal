import { leadsTabsSectionTypes } from "@/types/tabs";
import React from "react";

const DetailsTab = ({
  name,
  setTabType,
  tabType,
  isSelected,
  icon,
  selectedTab,
  onScroll,
}: leadsTabsSectionTypes) => {
  const handleClickScroll = (name: string) => {
    onScroll && onScroll(selectedTab);
    setTabType(selectedTab);
  };

  return (
    <button
      onClick={() => handleClickScroll(name)}
      className={`h-fit whitespace-nowrap rounded-lg py-[10px] border px-4 text-lg font-medium flex items-center bg-white ${
        isSelected
          ? "border-[#4A13E7] text-primary"
          : "border-[#EBEBEB] text-EBEBEB"
      }`}
    >
      <span
        className="mr-[10px]"
        dangerouslySetInnerHTML={{ __html: icon }}
      ></span>
      {name}
    </button>
  );
};

export default DetailsTab;
