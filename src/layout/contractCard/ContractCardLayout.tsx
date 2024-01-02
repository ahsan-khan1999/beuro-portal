import { detailScreenCardsLayout } from "@/types";
import React from "react";

const ContractCardLayout = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="rounded-md border-none bg-white py-5 px-5 border w-full h-fit">
      {children}
    </div>
  );
};

export default ContractCardLayout;
