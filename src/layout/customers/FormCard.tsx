import { detailScreenCardsLayout } from "@/types";
import React from "react";

const FormCard = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="rounded-md bg-white pt-5 px-6 pb-6 border border-primary w-full h-fit">
      {children}
    </div>
  );
};

export default FormCard;
