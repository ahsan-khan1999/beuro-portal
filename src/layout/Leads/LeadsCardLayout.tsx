import { detailScreenCardsLayout } from "@/types";
import React from "react";

const LeadsCardLayout = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="rounded-md border-none bg-white pt-5 px-6 pb-6 border w-full h-fit">
      {children}
    </div>
  );
};

export default LeadsCardLayout;
