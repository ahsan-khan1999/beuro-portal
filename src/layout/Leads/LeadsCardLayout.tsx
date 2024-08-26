import { detailScreenCardsLayout } from "@/types";
import React from "react";

const LeadsCardLayout = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="rounded-lg border-none bg-white border w-full h-fit z-auto">
      {children}
    </div>
  );
};

export default LeadsCardLayout;
