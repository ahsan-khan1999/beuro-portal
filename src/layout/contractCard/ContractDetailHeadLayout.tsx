import { detailScreenCardsLayout } from "@/types";
import React from "react";

const ContractDetailHeadLayout = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="rounded-md border-none bg-white py-[19px] px-[34px] my-[16px] border w-full h-fit">
      {children}
    </div>
  );
};

export default ContractDetailHeadLayout;
