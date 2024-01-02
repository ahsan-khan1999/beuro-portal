import { detailScreenCardsLayout } from "@/types";
import React from "react";

const FormCard = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="rounded-md bg-white py-[26px] pl-[32px] pr-[25px] w-full h-fit">
      {children}
    </div>
  );
};

export default FormCard;
