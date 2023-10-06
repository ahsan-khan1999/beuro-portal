import { detailScreenCardsLayout } from "@/types";
import React from "react";

const DetailsCard = ({ children }: detailScreenCardsLayout) => {
  return <div className="bg-white rounded-md px-5 pt-5 pb-10">{children}</div>;
};

export default DetailsCard;
