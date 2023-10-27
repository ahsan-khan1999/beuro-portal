import { OfferTabsSectionTypes } from "@/types/tabs";
import React from "react";

const OfferTabs = ({
  name,
  setTabType,
  isSelected,
  icon,
  index,
  selectedTab,
}: OfferTabsSectionTypes) => {
  return (
    <>
      <div className="flex justify-between gap-3">
        <span
          className={`h-fit whitespace-nowrap rounded-lg py-[11px] border px-4 w-fit text-lg font-medium flex items-center bg-white ${
            isSelected
              ? "border-[#4A13E7] text-primary"
              : "border-[#EBEBEB] text-EBEBEB"
          }`}
        >
          {index}
        </span>
        <button
          onClick={() => setTabType(selectedTab)}
          className={`h-fit whitespace-nowrap rounded-lg py-[10px] border px-4 w-full text-lg font-medium flex items-center bg-white ${
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
      </div>
    </>
  );
};

export default OfferTabs;
