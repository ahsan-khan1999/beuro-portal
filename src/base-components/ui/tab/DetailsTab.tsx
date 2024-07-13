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
  onItemSelected,
}: leadsTabsSectionTypes) => {
  const handleClickScroll = (name: string) => {
    // onScroll && onScroll(selectedTab);
    onItemSelected && onItemSelected(name);
    setTabType(selectedTab);
  };

  // const scrollHandler2 = () => {
  //   const element = document.getElementById(name);
  //   if (!element) return;

  //   const { top } = element.getBoundingClientRect();
  //   window.scrollTo({ behavior: "smooth", top: window.scrollY + top });
  //   setTabType(selectedTab);
  // };

  return (
    <button
      onClick={() => handleClickScroll(name)}
      className={`h-fit whitespace-nowrap rounded-lg py-[10px] border px-[14px] text-base font-normal flex items-center bg-white w-[247px]  ${
        isSelected
          ? "border-primary text-primary"
          : "border-[#EBEBEB] text-[#1E1E1E]"
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
