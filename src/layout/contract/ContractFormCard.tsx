import { detailScreenCardsLayout } from "@/types";
import React from "react";

const ContractFormCard = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="rounded-md bg-white py-[26px] pl-[43px] pr-[32px] w-full h-fit">
      {children}
    </div>
  );
};

export default ContractFormCard;
