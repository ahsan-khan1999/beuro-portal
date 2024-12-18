import { OfferTabsSectionTypes } from "@/types/tabs";
import React from "react";

const OfferTabs = ({
  name,
  setTabType,
  isSelected,
  isToggle,
  icon,
  index,
  selectedTab,
  onItemSelected,
}: OfferTabsSectionTypes) => {
  // const handleClickScroll = (name: string) => {
  //   const element = document.getElementById(name);
  //   if (element) {
  //     element.setAttribute("data-scroll-target", "true");
  //     element.scrollIntoView({ behavior: "smooth", block: "start" });
  //     setTabType(selectedTab);
  //   } else {
  //     setTabType(selectedTab);
  //   }
  // };

  const handleClickScroll = (name: string) => {
    onItemSelected && onItemSelected(name);
    setTabType(selectedTab);
  };

  return (
    <div className="flex justify-between gap-3" key={selectedTab}>
      <span
        className={`h-fit whitespace-nowrap rounded-lg py-[11px] border px-4 w-fit text-lg font-medium flex items-center bg-white min-w-[45px] ${
          isSelected
            ? "border-[#4A13E7] text-primary"
            : "border-[#EBEBEB] text-EBEBEB"
        }`}
      >
        {index}
      </span>
      <button
        onClick={() =>
          isToggle ? handleClickScroll(name) : setTabType(selectedTab)
        }
        className={`h-fit min-w-[226px] whitespace-nowrap rounded-lg py-[10px] border px-4 w-full text-lg font-medium flex items-center bg-white ${
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
  );
};

export default OfferTabs;
