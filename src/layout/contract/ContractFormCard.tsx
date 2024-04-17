import { detailScreenCardsLayout } from "@/types";
import React from "react";

const ContractFormCard = ({ children }: detailScreenCardsLayout) => {
  return <div className="rounded-md bg-white w-full h-fit">{children}</div>;
};

export default ContractFormCard;
