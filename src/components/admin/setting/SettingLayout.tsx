import { detailScreenCardsLayout } from "@/types";
import React from "react";

const SettingLayout = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="border border-[#EBEBEB] rounded-md bg-white pl-[30px] pr-4 py-3 w-full h-fit">
      {children}
    </div>
  );
};

export default SettingLayout;
