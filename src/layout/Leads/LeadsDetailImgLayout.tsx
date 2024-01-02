import { detailScreenCardsLayout } from "@/types";
import React from "react";

const LeadsDetailImgLayout = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="rounded-md border-none bg-white border w-full h-fit">
      {children}
    </div>
  );
};

export default LeadsDetailImgLayout;
